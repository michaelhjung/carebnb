import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';
import * as bookingsActions from '../../store/bookings';
import CreateBookingForm from '../CreateBookingForm';
import ShowBookingsButton from './ShowBookingsButton';
import './SpotDetails.css';

export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const spotBookings = useSelector(state => state.bookings.spot);
    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(spotId));
        dispatch(bookingsActions.getSpotBookings(spotId));
    }, [dispatch, spotId, sessionUser]);

    if (!spot || !Object.entries(spot).length) return null;

    return (
        <main id='spot-details--page-container'>
            <div id='spot-details--container'>
                <h1 id='spot-details--title-main'>{spot.name}</h1>

                <div className='spot-details--sub-title-reviews'>
                    <span id='spot-details--sub-title-rating'>
                        <i className="fa-solid fa-star icon--star" />
                        {" "}
                        {(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'New'}
                    </span>
                    <span className='spot-details--sub-title-dot'> · </span>
                    <span id='spot-details--sub-title-numReviews'>{spot.numReviews} reviews</span>
                    <span className='spot-details--sub-title-dot'> · </span>
                    {/* <span id='spot-details--sub-title-owner'>{spot.Owner.firstName}</span>
                    <span className='spot-details--sub-title-dot'> · </span> */}
                    <span id='spot-details--sub-title-location'>{spot.city}, {spot.state}, {spot.country}</span>
                </div>

                <div className='spot-details--imgs-container'>
                    {spot.spotImages.map(img => (
                        <img key={img.url} src={img.url} alt={img.url} className='spot-details--img' />
                    ))}
                </div>


                <div id='container--spot-details-booking'>
                    <div id='spot-details--info-left'>
                        <div className='spot-details--title-host-info'>
                            <h2 id='host-info'>Home hosted by {spot.Owner.firstName}</h2>
                        </div>

                        <div id='air-cover'>
                            <h2>
                                <span id='text-air'>air</span><span id='text-cover'>cover</span>
                            </h2>
                            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        </div>

                        <div className='spot-details--description-container'>
                            <p className='spot-details--description'>{spot.description}</p>
                        </div>
                        <div>
                            <ShowBookingsButton
                                spot={spot}
                                user={sessionUser}
                                bookings={spotBookings}
                            />
                        </div>
                    </div>

                    <div id='spot-details--info-right' className='spot-bookings--container'>
                            <CreateBookingForm
                                spot={spot}
                                user={sessionUser}
                                bookings={spotBookings}
                            />
                    </div>
                </div>
            </div>
        </main>
    )
}
