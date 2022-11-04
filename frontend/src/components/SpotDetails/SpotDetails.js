import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';
import * as bookingsActions from '../../store/bookings';
import * as reviewsActions from '../../store/reviews';
import CreateBookingForm from '../CreateBookingForm';
import ShowBookingsButton from './ShowBookingsButton';
import AddReviewImageButton from '../UserReviews/AddReviewImageButton';
import EditReviewButton from '../UserReviews/EditReviewButton';
import DeleteReviewButton from '../UserReviews/DeleteReviewButton';
import './SpotDetails.css';

export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const spotBookings = useSelector(state => state.bookings.spot);
    const spotReviews = useSelector(state => state.reviews.spot);

    const handleDeleteClick = async (reviewId) => {
        try {
            await dispatch(reviewsActions.deleteReview(reviewId))
        }

        catch (res) {
            const data = await res.json();
            if (data.message) return alert(data.message);
        }
    }

    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(spotId));
        dispatch(bookingsActions.getSpotBookings(spotId));
        dispatch(reviewsActions.getSpotReviews(spotId));

        return () => {
            dispatch(spotsActions.clearData());
            dispatch(reviewsActions.clearData());
        }
    }, [dispatch, spotId, sessionUser]);

    useEffect(() => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('max-width-1100');

        return () => nav.classList.toggle('max-width-1100');
    }, []);

    // THE FOLLOWING USEEFFECT RENDERS IMAGES CONDITIONALLY BASED ON HOW MANY IMAGES:
    useEffect(() => {
        if (spot && spot.spotImages) {
            const imgsContainer = document.querySelector('.spot-details--imgs-container');
            if (spot.spotImages.length === 1) {
                imgsContainer.setAttribute('id', 'imgs-length-1');

                const img1 = document.querySelector('.spot-details--img:nth-child(1)');
                if (img1) img1.setAttribute('id', 'length-1-img-1');

                return () => {
                    imgsContainer.removeAttribute('id');
                    if (img1) img1.removeAttribute('id');
                }
            }
            else if (spot.spotImages.length === 2) {
                imgsContainer.setAttribute('id', 'imgs-length-2');

                const img1 = document.querySelector('.spot-details--img:nth-child(1)');
                const img2 = document.querySelector('.spot-details--img:nth-child(2)');

                if (img1) img1.setAttribute('id', 'length-2-img-1');
                if (img2) img2.setAttribute('id', 'length-2-img-2');

                return () => {
                    imgsContainer.removeAttribute('id');
                    if (img1) img1.removeAttribute('id');
                    if (img2) img1.removeAttribute('id');
                }
            }
            else if (spot.spotImages.length === 3) {
                imgsContainer.setAttribute('id', 'imgs-length-3');

                const img1 = document.querySelector('.spot-details--img:nth-child(1)');
                const img2 = document.querySelector('.spot-details--img:nth-child(2)');
                const img3 = document.querySelector('.spot-details--img:nth-child(3)');

                if (img1) img1.setAttribute('id', 'length-3-img-1');
                if (img2) img2.setAttribute('id', 'length-3-img-2');
                if (img3) img3.setAttribute('id', 'length-3-img-3');

                return () => {
                    imgsContainer.removeAttribute('id');
                    if (img1) img1.removeAttribute('id');
                    if (img2) img2.removeAttribute('id');
                    if (img3) img3.removeAttribute('id');
                }
            }
            else if (spot.spotImages.length === 4) {
                imgsContainer.setAttribute('id', 'imgs-length-4');

                const img1 = document.querySelector('.spot-details--img:nth-child(1)');
                const img2 = document.querySelector('.spot-details--img:nth-child(2)');
                const img3 = document.querySelector('.spot-details--img:nth-child(3)');
                const img4 = document.querySelector('.spot-details--img:nth-child(4)');

                if (img1) img1.setAttribute('id', 'length-4-img-1');
                if (img2) img2.setAttribute('id', 'length-4-img-2');
                if (img3) img3.setAttribute('id', 'length-4-img-3');
                if (img4) img4.setAttribute('id', 'length-4-img-4');

                return () => {
                    imgsContainer.removeAttribute('id');
                    if (img1) img1.removeAttribute('id');
                    if (img2) img2.removeAttribute('id');
                    if (img3) img3.removeAttribute('id');
                    if (img4) img4.removeAttribute('id');
                }
            }
            else if (spot.spotImages.length >= 5) {
                imgsContainer.setAttribute('id', 'imgs-length-5');

                const img1 = document.querySelector('.spot-details--img:nth-child(1)');
                const img2 = document.querySelector('.spot-details--img:nth-child(2)');
                const img3 = document.querySelector('.spot-details--img:nth-child(3)');
                const img4 = document.querySelector('.spot-details--img:nth-child(4)');
                const img5 = document.querySelector('.spot-details--img:nth-child(5)');

                if (img1) img1.setAttribute('id', 'length-5-img-1');
                if (img2) img2.setAttribute('id', 'length-5-img-2');
                if (img3) img3.setAttribute('id', 'length-5-img-3');
                if (img4) img4.setAttribute('id', 'length-5-img-4');
                if (img5) img5.setAttribute('id', 'length-5-img-5');

                return () => {
                    imgsContainer.removeAttribute('id');
                    if (img1) img1.removeAttribute('id');
                    if (img2) img2.removeAttribute('id');
                    if (img3) img3.removeAttribute('id');
                    if (img4) img4.removeAttribute('id');
                    if (img5) img5.removeAttribute('id');
                }
            }
        }

    }, [spot]);

    if (!spot || !Object.entries(spot).length) return null;

    return (
        <main id='spot-details--page-container'>
            <div id='spot-details--container'>
                <h1 id='spot-details--title-main'>{spot.name}</h1>

                <div className='spot-details--sub-title-reviews'>
                    <span id='spot-details--sub-title-rating'>
                        <i className="fa-solid fa-star icon--star fa-sm" />
                        {" "}
                        {(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'New'}
                    </span>
                    <span className='spot-details--sub-title-dot'> · </span>
                    <span id='spot-details--sub-title-numReviews'>{spot.numReviews} reviews</span>
                    <span className='spot-details--sub-title-dot'> · </span>
                    <span id='spot-details--sub-title-location'>{spot.city}, {spot.state}, {spot.country}</span>
                </div>

                <div className='spot-details--imgs-container'>
                    {spot.spotImages.map(img => (
                        <img key={img.url} src={img.url} alt={img.url} className='spot-details--img' onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                    ))}
                </div>


                <div id='container--details-booking'>
                    <div id='container--spot-details-booking'>
                        <div id='spot-details--info-left'>
                            <div className='spot-details--title-host-info'>
                                <h2 id='host-info'>Entire home hosted by {spot.Owner.firstName}</h2>
                            </div>

                            <div id='features'>
                                <div className='features-item'>
                                    <div className='features-icon'>
                                        <i className="fa-solid fa-medal fa-xl" />
                                    </div>
                                    <div className='features-text'>
                                        <div className='features-main-text'>
                                            {spot.Owner.firstName} is a Superhost
                                        </div>
                                        <div className='features-sub-text'>
                                            Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                        </div>
                                    </div>
                                </div>
                                <div className='features-item'>
                                    <div className='features-icon'>
                                        <i className="fa-solid fa-door-open fa-xl" />
                                    </div>
                                    <div className='features-text'>
                                        <div className='features-main-text'>
                                            Self check-in
                                        </div>
                                        <div className='features-sub-text'>
                                            Check yourself in with the keypad.
                                        </div>
                                    </div>
                                </div>
                                <div className='features-item'>
                                    <div className='features-icon'>
                                        <i className="fa-regular fa-calendar fa-xl" />
                                    </div>
                                    <div className='features-text'>
                                        <div className='features-main-text'>
                                            Free cancellation for 48 hours.
                                        </div>
                                    </div>
                                </div>
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
                    </div>

                    <div id='spot-details--booking-menu' className='spot-bookings--container'>
                            <CreateBookingForm
                                spot={spot}
                                user={sessionUser}
                                bookings={spotBookings}
                            />
                    </div>
                </div>

                <div className='container--reviews'>
                    <div className='container--reviews-title'>
                        <i className="fa-solid fa-star icon--star fa-1x reviews-title-el" />
                        <h2 id='reviews-rating' className='reviews-title-el'>{(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'New'}</h2>
                        <h2 className='reviews--title-dot reviews-title-el'>·</h2>
                        <h2 id='reviews--title-numReviews' className='reviews-title-el'>{spot.numReviews} reviews</h2>

                        {sessionUser && (
                        <NavLink to={`/spots/${spot.id}/add-review`}>
                            <button
                                id='button--add-review'
                                className='submit-button'
                            >
                                Add a Review
                            </button>
                        </NavLink>)}
                    </div>

                <div className='container--actual-reviews'>
                    {spotReviews && Object.values(spotReviews).map(review => (
                        <div className='container-single-review'>
                            <div className='review-title'>
                                <i id='profile-icon-reviewer' className="fas fa-user-circle icon--profile fa-2x" />
                                <div className='review-name-date'>
                                    <div className='reviewer-name'>{review.User && review.User.firstName}</div>
                                    <div className='review-created-date'>{new Date(review.createdAt).toLocaleString('default', { month: 'long' })} {new Date(review.createdAt).getFullYear()}</div>
                                </div>
                            </div>
                            <div className='review-description'>
                                <div className='review-text'>{review.review}</div>
                                {review.ReviewImages.length > 0 && (
                                    <div className='review-images'>{review.ReviewImages && review.ReviewImages.map(img => (
                                        <img className='review-img' src={img.url} alt={img.id} onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                                    ))}</div>
                                )}
                            </div>
                            {sessionUser && review.User && review.User.id === sessionUser.id && (

                                <div id='spot-details-review-buttons'>
                                    <NavLink to={`/user/${sessionUser.id}/reviews/${review.id}/add-review-image`}>
                                        <button id="spot-details-add-rev-img">Add Image</button>
                                    </NavLink>

                                    <NavLink to={`/user/${sessionUser.id}/reviews/${review.id}/edit`}>
                                        <button id="spot-details-edit-rev">Edit Review</button>
                                    </NavLink>

                                    <button onClick={() => handleDeleteClick(review.id)} id="spot-details-delete-rev">Delete Review</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                </div>
            </div>
        </main>
    )
}
