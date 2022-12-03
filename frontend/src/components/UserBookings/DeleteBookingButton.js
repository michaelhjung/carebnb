import React from 'react'
import { useDispatch } from 'react-redux'
import * as bookingsActions from '../../store/bookings';

export default function DeleteBookingButton({ bookingId }) {
    const dispatch = useDispatch();
    const handleDeleteClick = async () => {
        if (window.confirm(`Please verify you would like to delete your booking by clicking "OK". This action cannot be undone.`)) {
            try {
                await dispatch(bookingsActions.deleteBooking(bookingId))
            }

            catch (res) {
                const data = await res.json();
                if (data.message) return alert(data.message);
            }
        }
    }

    return (
        <button onClick={handleDeleteClick} id="button--delete-booking">DELETE Booking</button>
    )
}
