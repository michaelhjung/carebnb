const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

/*--------------------------------- ROUTES ---------------------------------*/
// Get all Spots
router.get('/', async (req, res, next) => {

    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            },
            {
                model: SpotImage,
                // as: 'previewImage',
                attributes: ['url'],
                where: {
                    preview: true
                },
                required: false
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ]
            ],
            required: false
        }
    });

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

    res.json(mySpots);
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
            { model: SpotImage },
            // { model: User, where: { ownerId: this.ownerId } },
        ]
    });

    if (spot) res.json(spot);
    else res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    });
});

/*--------------------------------------------------------------------------*/




module.exports = router;
