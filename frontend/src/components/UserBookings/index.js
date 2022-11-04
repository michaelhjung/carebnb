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

    useEffect(() => {
        if (userBookings) {
            const today = new Date(Date.now());
            Object.values(userBookings).forEach(booking => {
                const parsedEndDate = new Date(booking.endDate + "T00:00:00");
                if (today > parsedEndDate) dispatch(bookingsActions.deleteBooking(booking.id));
            });
        }
    }, [dispatch, userBookings]);

    if (!sessionUser) return <Redirect to="/" />
    if (!userBookings) return null;

    return (
        <>
            <h1>Hello, {sessionUser.firstName}. Here are your bookings:</h1>
            <main className='container--bookings'>
                {Object.values(userBookings).map(booking => booking.Spot && (
                    <div key={booking.id} className='booking-card'>
                        <NavLink className="booking-img-container" to={`/spots/${booking.spotId}`}>
                            <img src={booking.Spot.previewImage} alt={booking.Spot.name} className='booking-card--spot-card-img' />
                            <span id='booking-card--info-name' className='booking-card--info'>{booking.Spot.name}</span>
                        </NavLink>
                        <div id='booking-card--info-container'>
                            <div className='booking-card--booking-info'>
                                <div className='booking-card--check-in-out-container'>
                                    <span className='booking-card--check-in-out-text'>Check In</span>
                                    <span className='booking-dates'>{new Date(booking.startDate).toUTCString().split(' ').slice(0, 1).join(' ')} {new Date(booking.startDate).toUTCString().split(' ').slice(2, 3).join(' ')} {new Date(booking.startDate).toUTCString().split(' ').slice(1, 2).join(' ')}, {new Date(booking.startDate).toUTCString().split(' ').slice(3, 4).join(' ')}</span>
                                </div>
                                <div className='booking-card--check-in-out-container'>
                                    <span className='booking-card--check-in-out-text'>Check Out</span>
                                    <span className='booking-dates'>{new Date(booking.endDate).toUTCString().split(' ').slice(0, 1).join(' ')} {new Date(booking.endDate).toUTCString().split(' ').slice(2, 3).join(' ')} {new Date(booking.endDate).toUTCString().split(' ').slice(1, 2).join(' ')}, {new Date(booking.endDate).toUTCString().split(' ').slice(3, 4).join(' ')}</span>
                                </div>
                            </div>
                        </div>
                        <div id='booking-card--info-price-container' className='booking-card--info'>
                            <span id='booking-card--info-price'>
                            ${booking.Spot.price}
                            </span>
                            {" "}
                            per night
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
