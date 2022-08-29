const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

/*--------------------------------- ROUTES ---------------------------------*/
router.get('/', async (req, res, next) => {
    // res.json("this is the GET /api/spots route!");
    const spots = await Spot.findAll({
        include: [Review, User, Booking, SpotImage]
    });

    res.json(spots);
});


/*--------------------------------------------------------------------------*/




module.exports = router;
