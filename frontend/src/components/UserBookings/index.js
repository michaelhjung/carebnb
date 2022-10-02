import React, { useEffect } from 'react'
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings';
import DeleteBookingButton from './DeleteBookingButton';
import EditBookingButton from './EditBookingButton';
import './UserBookings.css';

export default function UserBookings() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userBookings = useSelector(state => state.bookings.user);

    useEffect(() => {
        dispatch(bookingsActions.getUserBookings());

        return () => dispatch(bookingsActions.clearData());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />
    if (!userBookings) return null;

    return (
        <>
            <h1>Hello, {sessionUser.firstName}. Here are your bookings:</h1>
            <main className='container--bookings'>
                {Object.values(userBookings).map(booking => booking.Spot && (
                    <div key={booking.id} className='booking-card'>
                        <NavLink to={`/spots/${booking.spotId}`}>
                            <img src={booking.Spot.previewImage} alt={booking.Spot.name} className='booking-card--spot-card-img' />
                        </NavLink>
                        <div id='booking-card--info-container'>
                            <div id='booking-card--info-name' className='booking-card--info'>{booking.Spot.name}</div>
                            <div id='booking-card--info-address' className='booking-card--info'>{booking.Spot.address}, {booking.Spot.city}, {booking.Spot.country}</div>
                            <div id='booking-card--info-price-container' className='booking-card--info'>
                                <span id='booking-card--info-price'>
                                ${booking.Spot.price}
                                </span>
                                {" "}
                                night
                            </div>
                            <div className='booking-card--booking-info'>
                                <div>Check In: <span className='booking-dates'>{booking.startDate}</span></div>
                                <div>Check Out: <span className='booking-dates'>{booking.endDate}</span></div>
                            </div>
                        </div>

                        <div className='booking-card--buttons-container'>
                            <NavLink to={`/user/${sessionUser.id}/bookings/${booking.id}/edit`}>
                                <EditBookingButton />
                            </NavLink>
                            <DeleteBookingButton bookingId={booking.id} />
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}
