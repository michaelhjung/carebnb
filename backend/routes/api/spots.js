const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

/*--------------------------------- ROUTES ---------------------------------*/
// Get all Spots
router.get('/', async (req, res, next) => {
    // res.json("this is the GET /api/spots route!");
    // const spots = await Spot.findAll(
    //     {
    //         include: [
    //             { model: Review, attributes: [] },
    //             { model: SpotImage, attributes: [] }
    //         ],
    //         attributes: {
    //             include: [
    //                 [
    //                     sequelize.fn("AVG", sequelize.col("Reviews.stars")),
    //                     "avgGrade"
    //                 ],
    //                 [

    //                 ]
    //             ]
    //         }
    //     }
    // );

    const spots = await Spot.findAll();

    res.json(spots);
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

/*--------------------------------------------------------------------------*/




module.exports = router;
