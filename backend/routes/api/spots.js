const express = require('express')

const { Spot } = require('../../db/models');

const router = express.Router();

/*--------------------------------- ROUTES ---------------------------------*/
router.get('/', async (req, res, next) => {
    // res.json("this is the GET /api/spots route!");
    const spots = await Spot.findAll();

    res.json(spots);
});


/*--------------------------------------------------------------------------*/




module.exports = router;
