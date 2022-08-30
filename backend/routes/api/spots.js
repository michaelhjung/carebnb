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
// Get all Spots
router.get('/', async (req, res, next) => {

    // const spots = await Spot.findAll({
    //     include: [
    //         {
    //             model: Review,
    //             attributes: [],
    //             required: false
    //         },
    //         {
    //             model: SpotImage,
    //             // as: 'previewImage',
    //             attributes: ['url'],
    //             where: {
    //                 preview: true
    //             },
    //             required: false
    //         }
    //     ],
    //     attributes: {
    //         include: [
    //             [
    //                 sequelize.fn("AVG", sequelize.col("Reviews.stars")),
    //                 "avgRating"
    //             ]
    //         ],
    //         required: false
    //     }
    // });

    const spots = await Spot.findAll();

    const spotsData = [];

    spots.forEach(async (spot) => {
        const reviewSum = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        })
        const reviewCount = await Review.count({
            where: {
                spotId: spot.id
            }
        })

        const spotData = spot.toJSON();
        if (reviewSum && reviewCount) {
            spotData.avgRating = reviewSum / reviewCount;
            // console.log("------->" + spotData.avgRating);
        }

        // console.log(spotData);
        spotsData.push(spotData);
    });

    // console.log("*******" + spotsData);

    res.json({
        Spots: [...spotsData]
    });
});

// Get all Spots owned by the Current Owner
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
        spotData.numReviews = await Review.count({
            where: {
                spotId: spot.id
            }
        });

        const reviewSum = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        });

        spotData.avgStarRating = reviewSum / spotData.numReviews;

        spotData.spotImages = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
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

        if (!address) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.address = "Street address is required";
            // next(err);
        }
        if (!city) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.city = "City is required";
            // next(err);
        }
        if (!state) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.state = "State is required";
            // next(err);
        }
        if (!country) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.country = "Country is required";
            // next(err);
        }
        if (!lat) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.lat = "Latitude is not valid";
            // next(err);
        }
        if (!lng) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.lng = "Longitude is not valid";
            // next(err);
        }
        if (!name) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.name = "Name must be less than 50 characters";
            // next(err);
        }
        if (!description) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.description = "Description is required";
            // next(err);
        }
        if (!price) {
            // err = new Error('Validation Error');
            err.title = "Validation Error"
            err.message = "Validation Error";
            err.status = 400;
            err.errors.price = "Price per day is required";
            // next(err);
        }

        next(err);
    }
});


/*--------------------------------------------------------------------------*/




module.exports = router;
