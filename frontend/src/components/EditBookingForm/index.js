import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingsActions from '../../store/bookings';
import './EditBookingForm.css';

// THIS COMPONENT IS NESTED IN SPOT BOOKINGS //

// TODO: THERE IS STILL A BUG WHERE IT SAYS THAT
// A SPOT IS ALREADY BOOKED WHEN TRYING TO UPDATE
// (WHEN IT'S NOT YET BOOKED FOR THOSE NEW DATES)

export default function EditBookingForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bookingId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const userBookings = useSelector(state => state.bookings.user);
    let currBooking;
    if (userBookings) currBooking = userBookings[bookingId];
    let spot;
    if (currBooking) spot = currBooking.Spot;

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        dispatch(bookingsActions.getUserBookings());

        return () => dispatch(bookingsActions.clearData());
    }, [dispatch]);

    useEffect(() => {
        const errors = [];
        const today = new Date(Date.now());
        const parsedStartDate = new Date(startDate + "T00:00:00");
        const parsedEndDate = new Date(endDate + "T00:00:00");

        if (today > parsedStartDate || today > parsedEndDate) {
            errors.push("You cannot book past dates or the current day");
        }
        if (parsedStartDate > parsedEndDate) {
            errors.push("The check in date cannot be after the check out date");
        }

        setValidationErrors(errors);

    }, [startDate, endDate]);

    useEffect(() => {
        if (currBooking) {
            setStartDate(currBooking.startDate || '');
            setEndDate(currBooking.endDate || '');
        }
    }, [currBooking]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sessionUser) return alert("You must be logged in to book a spot!");
        if (sessionUser.id === spot.ownerId) return alert("An owner cannot book at his own home");

        const updatedBookingData = {
            startDate,
            endDate
        }
        try {
            const updatedBooking = await dispatch(bookingsActions.updateBooking(bookingId, updatedBookingData));
            if (updatedBooking) {
                setValidationErrors([]);
                setStartDate("");
                setEndDate("");
                dispatch(bookingsActions.getUserBookings());

                history.push(`/user/${sessionUser.id}/bookings`);
            }
        }

        catch (res) {
            console.log(res)
            const data = await res.json();
            const errors = [];
            if (data && data.message) {
                errors.push(data.message);
            }
            setValidationErrors(errors);
        }
    };

    if (!sessionUser) return <Redirect to="/" />
    if (!userBookings) return null;
    if (!spot) return null;

    return (
        <div id='edit-booking-page'>
            <h1>Update your booking for <span id='edit-booking--spot-name'>{spot.name}</span>:</h1>
            <div id='container--edit-booking'>
                <form onSubmit={handleSubmit} className="form" id="form--create-booking">
                    {validationErrors.length > 0 && (
                        <ul className="list--errors">
                            {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                        </ul>
                    )}
                    <div id='booking-form-top'>
                        <div id='booking-form-top-left'>
                            <span id='booking-form-price'>${spot.price}</span>
                            {" "}
                            <span>night</span>
                        </div>
                        <div id='booking-form-top-right'>
                            <span id='booking-form-stars'>
                                <i className="fa-solid fa-star icon--star fa-xs" />
                                {" "}
                                {(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'New'}
                            </span>
                            <span className='booking-form-dot'> · </span>
                            <span id='booking-form-reviews'>{spot.numReviews} reviews</span>

                        </div>
                    </div>
                    <div id='check-in-out-container'>
                        <div id='check-in-container'>
                            <span id='check-in-text'>CHECK-IN</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className='form-field'
                                id='form-field--check-in'
                            />
                        </div>
                        <div id='check-out-container'>
                            <span id='check-out-text'>CHECKOUT</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className='form-field'
                                id='form-field--check-out'
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        id='button--booking-submit'
                        className='submit-button'
                        disabled={validationErrors.length}
                    >
                        Reserve
                    </button>
                </form>
            </div>
        </div>
    );
}
