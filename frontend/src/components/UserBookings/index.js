import React, { useEffect } from 'react'
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings';
import DeleteBookingButton from './DeleteBookingButton';
import './UserBookings.css';

export default function UserBookings() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userBookings = useSelector(state => state.bookings.user);

    useEffect(() => {
        dispatch(bookingsActions.getUserBookings());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />
    if (!userBookings) return null;

    return (
        <>
            <h1>Welcome, {sessionUser.firstName}. Here are your bookings:</h1>
            <main className='container--bookings'>
                {Object.values(userBookings).map(booking => booking.Spot && (
                    <div key={booking.id} className='booking-card'>
                        <div className='booking-card--spot-card'>
                            <div className='booking-card--info-name'>{booking.Spot.name}</div>
                            <div className='booking-card--info-address'>{booking.Spot.address}, {booking.Spot.city}, {booking.Spot.country}</div>
                            <div className='booking-card--info-price'>${booking.Spot.price}/night</div>

                            <NavLink to={`/spots/${booking.spotId}`}>
                                <img src={booking.Spot.previewImage} alt={booking.Spot.name} className='booking-card--spot-card-img' />
                            </NavLink>

                        </div>
                        <div className='booking-card--booking-info'>
                            <div>START DATE: {booking.startDate}</div>
                            <div>END DATE: {booking.endDate}</div>
                        </div>
                        <div className='booking-card--buttons-container'>


                            <DeleteBookingButton bookingId={booking.id} />
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}
