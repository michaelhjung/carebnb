const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
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
    check('county')
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
];
/*--------------------------------------------------------------------------*/

/*--------------------------------- ROUTES ---------------------------------*/
// Get all Spots ---> STILL NEEDS avgRating and previewImage
router.get('/', async (req, res, next) => {

    // // EAGER LOADING:
    // const spots = await Spot.findAll({
    //     attributes: {
    //         include: [
    //             [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
    //         ]
    //     },

    //     include:
    //         { model: Review, attributes: [] },

    //     group:
    //         ["Reviews.spotId"]
    //         // ["Reviews.spotId", "SpotImages.url"]
    // });

    // res.json({ Spots: spots });


    // LAZY LOADING (& N+1):
    const spots = await Spot.findAll({ raw: true });

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];

        const aggregates = {};
        const avgSpotRating = await Review.findOne({
            where: { spotId: spot.id },
            attributes: {
                include: [
                    [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
                ]
            },
            raw: true
        });
        aggregates.avgRating = avgSpotRating.avgRating;

        const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
        spotPreviews.forEach(image => {
            if (image.preview === 1) aggregates.previewImage = image.url;
        });
        if (!aggregates.previewImage) aggregates.previewImage = null;


        Object.assign(spot, aggregates);
        // Only send final response when all avgRatings & previewImages have been added
        if (i === spots.length - 1) res.json({ Spots: spots });
    }
});

// Get all Spots owned by the Current Owner ---> STILL NEEDS avgRating and previewImage
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const mySpots = await Spot.findAll({
        where: {
            ownerId: userId
        }
    });

    res.json({
        Spots: mySpots
    });
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
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
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
    } else {
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
        next(err);
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
            const err = new Error("Unauthorized user");
            err.title = "Authorization Error";
            err.message = "Unauthorized user";
            err.status = 401;
            next(err);
        }
    }

    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
});

// Edit a Spot ---> BODY VALIDATION ERROR STILL NOT WORKING
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
            const err = new Error("Unauthorized user");
            err.title = "Authorization Error";
            err.message = "Unauthorized user";
            err.status = 401;
            next(err);
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
            const err = new Error("Unauthorized user");
            err.title = "Authorization Error";
            err.message = "Unauthorized user";
            err.status = 401;
            next(err);
        }
    }

    else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
});


/*--------------------------------------------------------------------------*/




module.exports = router;
