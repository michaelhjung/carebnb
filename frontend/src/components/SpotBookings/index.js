import React, { useState } from 'react';
import CreateBookingForm from '../CreateBookingForm';

// THIS COMPONENT IS NESTED IN SPOT DETAILS //

export default function SpotBookings({ spot, user, bookings }) {

    const [showBookings, setShowBookings] = useState(false);
    const [bookingsButtonText, setBookingsButtonText] = useState("See Bookings for This Spot!");

    const handleClick = () => {
        if (!user) return alert("You must be signed in to see bookings");

        if (!showBookings) {
            setShowBookings(true);
            setBookingsButtonText("Hide Bookings");
        }
        if (showBookings) {
            setShowBookings(false);
            setBookingsButtonText("See Bookings for This Spot!");
        }
    }

    const isUserOwner = () => (user.id === spot.ownerId) ? true : false;

    return (
        <div className='container--spot-bookings'>
            {user && (
                <CreateBookingForm spot={spot} user={user} />
            )}

            <button
                onClick={handleClick}
                className='button--show-bookings'>
                    {bookingsButtonText}
            </button>

            {user && showBookings && (
                <div className='spot-bookings--details'>
                    <div>The following dates are booked for this spot:</div>
                    {Object.values(bookings).map(booking => (
                        <div key={booking.id} className='container--booking-card'>
                            {booking.startDate} to {booking.endDate}
                            {isUserOwner() && (
                                <span> · booked by: {`${booking.User.firstName} ${booking.User.lastName}`}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
