const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/* --------------------------------- ROUTES --------------------------------- */
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);
    if (spotImage) {
        // check if spot belongs to user
        const spot = await Spot.findByPk(spotImage.spotId);
        if (req.user.id === spot.ownerId) {
            await spotImage.destroy();

            res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }

        else res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    }

    else res.status(404).json({
        message: "Spot Image couldn't be found",
        statusCode: 404
    });
});


module.exports = router;
