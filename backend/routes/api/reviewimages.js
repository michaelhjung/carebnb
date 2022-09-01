const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*--------------------------------- ROUTES ---------------------------------*/
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    if (reviewImage) {
        // check if review belongs to user
        const review = await Review.findByPk(reviewImage.reviewId);
        if (req.user.id === review.userId) {
            await reviewImage.destroy();

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
        message: "Review Image couldn't be found",
        statusCode: 404
    });
});


/*--------------------------------------------------------------------------*/




module.exports = router;
