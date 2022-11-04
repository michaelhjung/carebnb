import React, { useState } from 'react';

// THIS COMPONENT IS NESTED IN SPOT DETAILS //

export default function ShowBookingsButton({ spot, user, bookings }) {
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
        <section>
            <button
                onClick={handleClick}
                id='button--show-bookings'
                className='submit-button'
            >
                {bookingsButtonText}
            </button>

            {user && showBookings && (
                <div className='spot-bookings--details'>
                    <div id='booked-dates-title'>The following dates are booked for this spot:</div>
                    {Object.values(bookings).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).map(booking => (
                        <div key={booking.id} className='container--booking-card'>
                            <span className='booked-date'>{booking.startDate}</span> to <span className='booked-date'>{booking.endDate}</span>
                            {isUserOwner() && (
                                <span key={booking.id} >
                                    {" "}
                                     · booked by
                                     <span className='booker-name'>{`${booking.User.firstName} ${booking.User.lastName}`}</span>
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
