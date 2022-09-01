const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*------------------------------- MIDDLEWARE -------------------------------*/
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required')
        .isLength({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is required')
        .isLength({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars is required')
        .isLength({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// const validateBooking = [
//     check('endDate')
//         .exists({ checkFalsy: true })
//         .withMessage('endDate is required')
//         // .custom((value, { req }) => {
//         //     if (new Date(value) <= new Date(req.body.startDate)) {
//         //         throw new Error('endDate cannot be on or before startDate');
//         //     }
//         // })
//         .isAfter('endDate', ['startDate'])
//         .withMessage('endDate cannot be on or before startDate'),
//     handleValidationErrors
// ];
/*--------------------------------------------------------------------------*/

/*--------------------------------- ROUTES ---------------------------------*/
// Get all Spots
router.get('/', async (req, res, next) => {
        // QUERY FILTERS:
        let err = { errors: {} };
        let { size, page, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        size = parseInt(size);
        page = parseInt(page);
        minLat = parseFloat(minLat);
        maxLat = parseFloat(maxLat);
        minLng = parseFloat(minLng);
        maxLng = parseFloat(maxLng);
        minPrice = parseFloat(minPrice);
        maxPrice = parseFloat(maxPrice);

        const pagination = {};
        if (size >= 1 && size <= 20) size = size;
        if (page >= 1 && page <= 10) page = page;
        if (size < 1 || size > 20) err.errors.size = "Size must be greater than or equal to 1";
        if (page < 1 || page > 10) err.errors.page = "Page must be greater than or equal to 1";
        // default size & page:
        if ((!size && size !== 0) || isNaN(size)) size = 20;
        if ((!page && page !== 0) || isNaN(page)) page = 1;
        pagination.limit = size;
        pagination.offset = size * (page - 1);

        // other queries:
        const where = {};
        if (minLat) {
            if (minLat >= -90) where.lat = minLat;
            else err.errors.minLat = "Minimum latitude is invalid";
        };
        if (maxLat) {
            if (maxLat <= 90) where.lat = maxLat;
            else err.errors.maxLat = "Maximum latitude is invalid";
        };
        if (minLng) {
            if (minLng >= -180) where.lng = minLng;
            else err.errors.minLng = "Minimum longitude is invalid";
        };
        if (maxLng) {
            if (maxLng <= 180) where.lng = maxLng;
            else err.errors.maxLng = "Maximum longitude is invalid";
        };
        if (minPrice) {
            if (minPrice >= 0) where.price = minPrice;
            else err.errors.minPrice = "Minimum price must be greater than or equal to 0";
        };
        if (maxPrice) {
            if (maxPrice >= 0) where.price = maxPrice;
            else err.errors.maxPrice = "Maximum price must be greater than or equal to 0";
        };


        // QUERY PARAMATER VALIDATION ERRORS:
        if (err.errors.size || err.errors.page || err.errors.minLat || err.errors.maxLat ||
            err.errors.minLng || err.errors.maxLng || err.errors.minPrice || err.errors.maxPrice) {
                err.title = "Validation Error";
                err.message = "Validation Error";
                err.status = 400;
                return next(err);
        }


    // LAZY LOADING (& N+1):
    const spots = await Spot.findAll({ where, raw: true, ...pagination });

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];

        const numReviews = await Review.count({ where: { spotId: spot.id } });
        const sumRatings = await Review.sum('stars', { where: { spotId: spot.id } });

        if (numReviews > 0 && sumRatings > 0) spot.avgRating = sumRatings / numReviews;
        else spot.avgRating = null;

        const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
        if (spotPreviews) {
            spotPreviews.forEach(image => {
                if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
            });

            if (!spot.previewImage) spot.previewImage = null;
        }
        else spot.previewImage = null;
    };

    res.json({ Spots: spots, page, size });
});

// Get all Spots owned by the Current Owner
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const mySpots = await Spot.findAll({ where: { ownerId: userId }, raw: true });

    for (let i = 0; i < mySpots.length; i++) {
        const spot = mySpots[i];

        const numReviews = await Review.count({ where: { spotId: spot.id } });
        const sumRatings = await Review.sum('stars', { where: { spotId: spot.id } });

        if (numReviews > 0 && sumRatings > 0) spot.avgRating = sumRatings / numReviews;
        else spot.avgRating = null;

        const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
        if (spotPreviews) {
            spotPreviews.forEach(image => {
                if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
            });

            if (!spot.previewImage) spot.previewImage = null;
        }
        else spot.previewImage = null;
    };

    res.json({ Spots: mySpots });
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (spot) {
        const spotData = spot.toJSON();

        spotData.numReviews = await Review.count({ where: { spotId: spot.id } });
        const reviewSum = await Review.sum('stars', { where: { spotId: spot.id } });
        spotData.avgStarRating = reviewSum / spotData.numReviews;
        spotData.spotImages = await SpotImage.findAll({
            where: { spotId: spot.id },
            attributes: ['id', 'url', 'preview']
        });
        spotData.Owner = await User.findByPk(spot.ownerId, {attributes: ['id', 'firstName', 'lastName'] });


        res.json(spotData);
    }
    else res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    });
});

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (address && city && state && country && lat && lng && name && description && price) {
        const spot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        res.status(201).json(spot);
    }

    else {
        let err = {};
        err.errors = {};

        if (!address) err.errors.address = "Street address is required";
        if (!city) err.errors.city = "City is required";
        if (!state) err.errors.state = "State is required";
        if (!country) err.errors.country = "Country is required";
        if (!lat) err.errors.lat = "Latitude is not valid";
        if (!lng) err.errors.lng = "Longitude is not valid";
        if (!name) err.errors.name = "Name must be less than 50 characters";
        if (!description) err.errors.description = "Description is required";
        if (!price) err.errors.price = "Price per day is required";

        err.title = "Validation Error";
        err.message = "Validation Error";
        err.status = 400;
        return next(err);
    }
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(parseInt(req.params.spotId));
    const { url, preview } = req.body;

    if (spot) {
        // Check if spot belongs to current user
        if (spot.ownerId === req.user.id) {

            // Check if preview is a boolean value
            if (url && (preview === true || preview === false)) {
                const spotImage = await SpotImage.create({
                    spotId: parseInt(req.params.spotId),
                    url,
                    preview
                });

                const spotImageData = {};
                spotImageData.id = spotImage.id
                spotImageData.url = spotImage.url
                spotImageData.preview = spotImage.preview

                res.json(spotImageData);
            }

            else {
                res.status(400).json({
                    message: "The values: url and preview (boolean) are required",
                    statusCode: 400
                })
            }

        // Error if current user is not owner of spot
        } else {
            const err = new Error("Forbidden");
            err.title = "Authorization Error";
            err.message = "Forbidden";
            err.status = 403;
            return next(err);
        }
    }

    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
});

// Edit a Spot ---> BODY VALIDATIONS WORKS, BUT DOES NOT SHOW KEYS FOR EA ERROR
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(parseInt(req.params.spotId));
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (spot) {
        // Check if spot belongs to current user
        if (spot.ownerId === req.user.id) {
            if (address) spot.address = address;
            if (city) spot.city = city;
            if (state) spot.state = state;
            if (country) spot.country = country;
            if (lat) spot.lat = lat;
            if (lng) spot.lng = lng;
            if (name) spot.name = name;
            if (description) spot.description = description;
            if (price) spot.price = price;

            await spot.save();

            res.json(spot);
        }

        // Error if current user is not owner of spot
        else {
            const err = new Error("Forbidden");
            err.title = "Authorization Error";
            err.message = "Forbidden";
            err.status = 403;
            return next(err);
        }
    }

    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(parseInt(req.params.spotId));

    if (spot) {
        // Check if spot belongs to current user
        if (spot.ownerId === req.user.id) {
            await spot.destroy();

            res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }

        // Error if current user is not owner of spot
        else {
            const err = new Error("Forbidden");
            err.title = "Authorization Error";
            err.message = "Forbidden";
            err.status = 403;
            return next(err);
        }
    }

    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
});



// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {
        const spotReviews = await Review.findAll({ where: { spotId: req.params.spotId }, raw: true });

        for (let i = 0; i < spotReviews.length; i++) {
            const review = spotReviews[i];

            const user = await User.findOne({
                where: { id: review.userId },
                attributes: { exclude: ['username'] },
                raw: true
            });

            let reviewImages = await ReviewImage.findAll({
                where: { reviewId: review.id },
                attributes: ['id', 'url'],
                raw: true
            });

            review.User = user;
            review.ReviewImages = reviewImages;
        };

        res.json({ Reviews: spotReviews });
    }

    // if spot not found
    else res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    });
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {
        // check if review from current user already exists
        const spotReviews = await Review.findAll({ where: { spotId: req.params.spotId }, raw: true });
        console.log(spotReviews)
        for (let i = 0; i < spotReviews.length; i++) {
            const review = spotReviews[i];
            if (review.userId === req.user.id) {
                res.status(403).json({
                    message: "User already has a review for this spot",
                    statusCode: 403
                });
                return;
            }
        }

        const { review, stars } = req.body;
        if (review && stars) {
            const newReview = await Review.create({
                spotId: req.params.spotId,
                userId: req.user.id,
                review,
                stars
            });

            res.status(201).json(newReview);
        }
    }

    // if spot not found
    else res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    });
});



// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {
        if (spot.ownerId === req.user.id) {
            const bookings = await Booking.findAll({ where: { spotId: spot.id }, raw: true });

            for (let i = 0; i < bookings.length; i++) {
                const booking = bookings[i];

                const bookingUser = await User.findOne({
                    where: { id: booking.userId },
                    attributes: ['id', 'firstName', 'lastName'],
                    raw: true
                });

                booking.User = bookingUser;
            }

            res.json({ Bookings: bookings });
        }

        // if you are NOT the owner of the spot
        else {
            const bookings = await Booking.findAll({
                where: {
                    spotId: spot.id
                },
                attributes: ['spotId', 'startDate', 'endDate']
            });

            res.json({ Bookings: bookings });
        }
    }

    // if spot not found
    else res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    });
});

// Create a Booking from a Spot based on the Spot's id ---> VALIDATE BOOKING NOT YET WORKING
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {
        if (spot.ownerId === req.user.id) {
            // owner is not allowed to book at his own spot
            res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            });
        }

        else {
            let { startDate, endDate } = req.body;
            if (startDate && endDate) {
                const allBookings = await Booking.findAll({ where: { spotId: req.params.spotId }, raw: true });

                // error handling inside this for loop
                for (let i = 0; i < allBookings.length; i++) {
                    const booking = allBookings[i];
                    const bookedSet = new Set();
                    const bookedStart = Date.parse(booking.startDate);
                    const bookedEnd = Date.parse(booking.endDate);
                    const requestedStart = Date.parse(startDate);
                    const requestedEnd = Date.parse(endDate);
                    let err = {};
                    err.errors = {};
                    err.errors.middleDates = [];

                    // if endDate is on or before startDate
                    if (requestedEnd <= requestedStart) {
                        if (err.errors.middleDates.length === 0) delete err.errors.middleDates;
                        err.errors.endDate = "endDate cannot be on or before startDate";
                        err.title = "Booking Conflict";
                        err.message = "Sorry, this spot is already booked for the specified dates";
                        err.status = 403;
                        return next(err);
                    }

                    // check for booking conflict
                    else {
                        // note: 86,400,000 milliseconds in 1 day
                        for (let i = bookedStart; i <= bookedEnd; i += 86_400_000) {
                            bookedSet.add(i);
                        };

                        for (let j = requestedStart; j <= requestedEnd; j += 86_400_000) {
                            if (bookedSet.has(j)) {
                                if (bookedSet.has(requestedStart)) err.errors.startDate = "Start date conflicts with an existing booking";
                                if (bookedSet.has(requestedEnd)) err.errors.endDate = "End date conflicts with an existing booking";
                                if ((j !== requestedStart && j !== requestedEnd) && bookedSet.has(j)) {
                                    err.errors.middleDates.push(`The date ${new Date(j).toISOString().split('T')[0]} conflicts with an existing booking`);
                                }
                            }
                        };

                        // actual error response for booking conflict
                        if (err.errors.startDate || err.errors.endDate || err.errors.middleDates.length > 0) {
                            if (err.errors.middleDates.length === 0) delete err.errors.middleDates;
                            err.title = "Booking Conflict";
                            err.message = "Sorry, this spot is already booked for the specified dates";
                            err.status = 403;
                            return next(err);
                        }
                    }
                };

                // if no conflicts
                const newBooking = await Booking.create({
                    spotId: req.params.spotId,
                    userId: req.user.id,
                    startDate,
                    endDate
                });

                res.json(newBooking);
            }
        }
    }

    // if spot not found
    else res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    });
});


/*--------------------------------------------------------------------------*/




module.exports = router;
