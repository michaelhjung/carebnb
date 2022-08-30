const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

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
    // spots.forEach(async spot => {
    //     const reviewSum = await Review.sum({
    //         where: {
    //             spotId: spot.id
    //         }
    //     });

    //     const reviewCount = await Review.count({
    //         where: {
    //             spotId: spot.id
    //         }
    //     });

    //     spot.avgRating = reviewSum / reviewCount;
    // });


    res.json({
        Spots: spots
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

/*--------------------------------------------------------------------------*/




module.exports = router;
