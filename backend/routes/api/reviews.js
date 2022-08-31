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
    };

    res.json({ Reviews: userReviews });
});


// ***CHECK SPOTS ROUTER FOR: Get all Reviews by a Spot's id***
// ***CHECK SPOTS ROUTER FOR: Create a Review for a Spot based on the Spot's id***


// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (review) {
        if (review.userId === req.user.id) {
            const reviewImages = await ReviewImage.findAll({ where: { reviewId: review.id } });
            if (reviewImages.length < 10) {
                const { url } = req.body;
                if (url) {
                    const newReviewImage = await ReviewImage.create({
                        reviewId: req.params.reviewId,
                        url
                    });

                    const reviewImageData = {}
                    reviewImageData.id = newReviewImage.id;
                    reviewImageData.url = newReviewImage.url;

                    res.json(reviewImageData);
                }

                // if there is no url value
                else {
                    res.status(400).json({
                        message: "Please provide a url",
                        statusCode: 400
                    });
                }
            }

            // if there are already 10 images for this review
            else {
                res.status(403).json({
                    message: "Maximum number of images for this resource was reached",
                    statusCode: 403
                });
            }
        }

        // if review does not belong to current user
        else res.status(401).json({
            message: "Unauthorized user",
            statusCode: 401
        });
    }

    // if review not found
    else res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404
    });
});

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const userReview = await Review.findByPk(req.params.reviewId);
    if (userReview) {
        if (userReview.userId === req.user.id) {
            const { review, stars } = req.body;

            if (review) userReview.review = review;
            if (stars) userReview.stars = stars;
            await userReview.save();

            res.json(userReview);
        }

        // if review does not belong to current user
        else res.status(401).json({
            message: "Unauthorized user",
            statusCode: 401
        });
    }

    // if review not found
    else res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404
    });
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (review) {
        if (review.userId === req.user.id) {


        }

        // if review does not belong to current user
        else res.status(401).json({
            message: "Unauthorized user",
            statusCode: 401
        });
    }

    // if review not found
    else res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404
    });
});


/*--------------------------------------------------------------------------*/




module.exports = router;
