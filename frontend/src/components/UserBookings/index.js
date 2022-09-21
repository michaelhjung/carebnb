import React, { useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings';
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
                {Object.values(userBookings).map(booking => (
                    <div key={booking.id} className='booking-card'>
                        <div className='booking-card--spot-card'>
                            <div className='booking-card--info-name'>{booking.Spot.name}</div>
                            <div className='booking-card--info-address'>{booking.Spot.address}, {booking.Spot.city}, {booking.Spot.country}</div>
                            <div className='booking-card--info-price'>${booking.Spot.price}/night</div>
                            <img src={booking.Spot.previewImage} alt={booking.Spot.name} className='booking-card--spot-card-img' />
                        </div>
                        <div className='booking-card--booking-info'>
                            <div>START DATE: {booking.startDate}</div>
                            <div>END DATE: {booking.endDate}</div>
                        </div>
                        <div className='booking-card--buttons-container'>
                            <NavLink to={`/bookings/${booking.id}/edit`}>
                                <button>--EDIT BOOKING BUTTON GOES HERE--</button>
                            </NavLink>

                            <button>--DELETE BOOKING BUTTON GOES HERE--</button>
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}
