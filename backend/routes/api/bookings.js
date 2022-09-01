const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*------------------------------- MIDDLEWARE -------------------------------*/
const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('endDate is required')
        .isAfter('startDate')
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];
/*--------------------------------------------------------------------------*/

/*---------------------------- HELPER FUNCTIONS ----------------------------*/
const formatDate = (date) => new Date(Date.parse(date)).toISOString().split('T')[0];
/*--------------------------------------------------------------------------*/

/*--------------------------------- ROUTES ---------------------------------*/
// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const userBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        raw: true
    });

    for (let i = 0; i < userBookings.length; i++) {
        const booking = userBookings[i];
        const spot = await Spot.findOne({
            where: { id: booking.spotId },
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            raw: true
        });

        const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
        spotPreviews.forEach(image => {
            if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
        });
        if (!spot.previewImage) spot.previewImage = null;

        booking.Spot = spot;
    }

    res.json({ Bookings: userBookings });
});



// ***CHECK SPOTS ROUTER FOR: Get all Bookings for a Spot based on the Spot's id***
// ***CHECK SPOTS ROUTER FOR: Create a Booking from a Spot based on the Spot's id***


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Review.findByPk(req.params.bookingId);
    if (booking) {
        if (booking.userId === req.user.id) {
            const today = new Date(Date.now());
            const parsedStartDate = new Date(Date.parse(booking.startDate));
            // *****TO-DO: ADD SOME CODE HERE!!!!!*****




            res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }

        // if booking does not belong to current user or spot does not bleong to owner
        else res.status(401).json({
            message: "Unauthorized user",
            statusCode: 401
        });
    }

    // if booking not found
    else res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404
    });
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (booking) {
        const spot = await Spot.findByPk(booking.spotId);
        if (booking.userId === req.user.id || spot.ownerId === req.user.id) {
            const today = new Date(Date.now());
            const parsedStartDate = new Date(Date.parse(booking.startDate));
            if (today < parsedStartDate) {
                await booking.destroy();

                res.json({
                    message: "Successfully deleted",
                    statusCode: 200
                });
            }

            else res.status(403).json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            });
        }

        // if booking does not belong to current user or spot does not bleong to owner
        else res.status(401).json({
            message: "Unauthorized user",
            statusCode: 401
        });
    }

    // if booking not found
    else res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404
    });
});


/*--------------------------------------------------------------------------*/




module.exports = router;
