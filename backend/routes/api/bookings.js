const express = require('express')

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/* ------------------------------- MIDDLEWARE ------------------------------- */
const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('endDate is required')
        .isAfter('startDate')
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];


/* ---------------------------- HELPER FUNCTIONS ---------------------------- */
const formatDate = (date) => new Date(Date.parse(date)).toISOString().split('T')[0];


/* --------------------------------- ROUTES --------------------------------- */
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
    const booking = await Booking.findByPk(req.params.bookingId);

    if (booking) {
        if (booking.userId === req.user.id) {
            const { startDate, endDate } = req.body;
            const requestedStart = Date.parse(startDate);
            const requestedEnd = Date.parse(endDate);
            const bookedStart = Date.parse(booking.startDate);
            const bookedEnd = Date.parse(booking.endDate);
            const today = Date.parse(new Date(Date.now()));
            let err = {};
            err.errors = {};
            err.errors.middleDates = [];

            // error handling: if endDate is on or before startDate
            if (requestedEnd <= requestedStart) {
                if (err.errors.middleDates.length === 0) delete err.errors.middleDates;
                err.errors.endDate = "endDate cannot come before startDate";
                err.title = "Booking Conflict";
                err.message = "Validation error";
                err.status = 400;
                next(err);
                return;
            }

            // error handling: if the booked end date has already past
            if (today > bookedEnd) {
                res.status(403).json({
                    message: "Past bookings can't be modified",
                    statusCode: 403
                })
            }

            // error handling: if the booked start date has already passed
            if (startDate && (today >= bookedStart)) {
                res.status(403).json({
                    message: "Unable to modify start date once it has passed",
                    statusCode: 403
                })
            }

            const allBookings = await Booking.findAll({ where: { spotId: booking.spotId }, raw: true });
            // check for booking conflict
            for (let i = 0; i < allBookings.length; i++) {
                const booking = allBookings[i];
                const bookedSet = new Set();
                const bookedStart = Date.parse(booking.startDate);
                const bookedEnd = Date.parse(booking.endDate);

                // note: 86,400,000 milliseconds in 1 day
                for (let i = bookedStart; i <= bookedEnd; i += 86_400_000) {
                    bookedSet.add(i);
                };

                for (let j = requestedStart; j <= requestedEnd; j += 86_400_000) {
                    if (bookedSet.has(j)) {
                        if (bookedSet.has(requestedStart)) err.errors.startDate = "Start date conflicts with an existing booking";
                        if (bookedSet.has(requestedEnd)) err.errors.endDate = "End date conflicts with an existing booking";
                        if ((j !== requestedStart && j !== requestedEnd) && bookedSet.has(j)) {
                            err.errors.middleDates.push(`The date ${new Date(j).toISOString().split('T')[0]} conflicts with an existing booking`);
                        }
                    }
                };

                // actual error response for booking conflict
                if (err.errors.startDate || err.errors.endDate || err.errors.middleDates.length > 0) {
                    if (err.errors.middleDates.length === 0) delete err.errors.middleDates;
                    err.title = "Booking Conflict";
                    err.message = "Sorry, this spot is already booked for the specified dates";
                    err.status = 403;
                    next(err);
                    return;
                }
            };

            // if no conflicts
            if (startDate && (today < bookedStart)) booking.startDate = startDate;
            if (endDate) booking.endDate = endDate;
            await booking.save();

            res.json(booking);
        }

        // if booking does not belong to current user
        else res.status(403).json({
            message: "Forbidden",
            statusCode: 403
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
        else res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    }

    // if booking not found
    else res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404
    });
});


module.exports = router;
