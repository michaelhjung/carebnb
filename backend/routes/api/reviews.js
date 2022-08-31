const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*------------------------------- MIDDLEWARE -------------------------------*/
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
/*--------------------------------------------------------------------------*/

/*--------------------------------- ROUTES ---------------------------------*/
// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const userReviews = await Review.findAll({ where: { userId: req.user.id }, raw: true });

    const currUser = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['username'] },
        raw: true
    });

    for (let i = 0; i < userReviews.length; i++) {
        const review = userReviews[i];

        const spotData = await Spot.findOne({
             where: { id: review.spotId },
             attributes: { exclude: ['createdAt', 'updatedAt'] },
             raw: true
        });
        const spotPreviews = await SpotImage.findAll({ where: { spotId: spotData.id }, raw: true });
        spotPreviews.forEach(image => {
            if (image.preview === true || image.preview === 1) spotData.previewImage = image.url;
        });
        if (!spotData.previewImage) spotData.previewImage = null;

        const reviewImageData = await ReviewImage.findAll({
            where: { reviewId: review.id },
            attributes: ['id', 'url'],
            raw: true
        });

        review.User = currUser;
        review.Spot = spotData;
        review.ReviewImages = reviewImageData;
    }

    res.json(userReviews);
});


// ***CHECK SPOTS ROUTER FOR: Get all Reviews by a Spot's id***
// ***CHECK SPOTS ROUTER FOR: Create a Review for a Spot based on the Spot's id***


// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

});

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {

});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

});


/*--------------------------------------------------------------------------*/




module.exports = router;
