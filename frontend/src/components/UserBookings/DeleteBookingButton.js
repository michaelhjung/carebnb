import React from 'react'
import { useDispatch } from 'react-redux'
import * as bookingsActions from '../../store/bookings';

export default function DeleteBookingButton({ bookingId }) {
    const dispatch = useDispatch();
    const handleDeleteClick = async () => {
        try {
            await dispatch(bookingsActions.deleteBooking(bookingId))
        }

        catch (res) {
            const data = await res.json();
            if (data) console.log("ANY ISSUES ON DELETE BOOKING:", data);
        }
    }

    return (
        <button onClick={handleDeleteClick}>DELETE Booking</button>
    )
}
