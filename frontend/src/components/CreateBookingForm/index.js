import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings';
import './CreateBookingForm.css';

// THIS COMPONENT IS NESTED IN SPOT BOOKINGS //

export default function CreateBookingForm({ spot, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return alert("You must be logged in to book a spot!");
        if (user.id === spot.ownerId) return alert("An owner cannot book at his own home");

        const newBooking = {
            startDate,
            endDate
        }
        try {
            const createdBooking = await dispatch(bookingsActions.createBooking(spot.id, newBooking));
            if (createdBooking) {
                setValidationErrors([]);
                setStartDate("");
                setEndDate("");
                dispatch(bookingsActions.getSpotBookings(spot.id));

                history.push(`/user/${user.id}/bookings`);
            }
        }

        catch (res) {
            const data = await res.json();
            const errors = [];
            if (data && data.message) {
                errors.push(data.message);
            }
            setValidationErrors(errors);
        }
    };


    return (
        <div id='container--spot-bookings'>
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
                        <span id='check-in-text'>CHECK-IN:</span>
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
                        <span id='check-out-text'>CHECKOUT:</span>
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
                <button type="submit" id='booking-button' className='submit-button' disabled={validationErrors.length}>Reserve</button>
            </form>
        </div>
    );
}
