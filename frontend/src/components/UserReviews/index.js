import React, { useEffect } from 'react'
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as reviewsActions from '../../store/reviews';
import DeleteReviewButton from './DeleteReviewButton';
import EditReviewButton from './EditReviewButton';
import './UserReviews.css';
import AddReviewImageButton from './AddReviewImageButton';

export default function UserReviews() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userReviews = useSelector(state => state.reviews.user);

    useEffect(() => {
        dispatch(reviewsActions.getUserReviews());

        return () => dispatch(reviewsActions.clearData());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />
    if (!userReviews) return null;

    return (
        <>
            <h1>Hello, {sessionUser.firstName}. Here are your reviews:</h1>
            <main className='container--user-reviews'>
                {Object.values(userReviews).map(review => review.Spot && (
                    <div key={review.id} className='review-card'>
                        <NavLink to={`/spots/${review.spotId}`}>
                            <img src={review.Spot.previewImage} alt={review.Spot.name} className='review-card--spot-card-img' />
                        </NavLink>
                        <div id='review-card--info-container'>
                            <div className='review-card--name-rating'>
                                <div id='review-card--info-name' className='review-card--info'>{review.Spot.name}</div>
                                <div className='review-card--rating-container'>
                                    <i className="fa-solid fa-star icon--star fa-1x user-reviews--star-icon" />
                                    <div className='review-card--rating'>{review.stars}</div>
                                </div>
                            </div>

                            <h2 id='review-card--review-header'>Review:</h2>
                            <p className='review-card--actual-review'>{review.review}</p>

                            {review.ReviewImages.length > 0 && (
                                <h2 id='review-card--review-img-header'>Review Images:</h2>
                            )}
                            <div className='user-review-images'>{review.ReviewImages && review.ReviewImages.map(img => (
                                    <img className='user-review-img' src={img.url} alt={img.id} />
                            ))}</div>

                        </div>

                        <div className='review-card--buttons-container'>
                            <NavLink to={`/user/${sessionUser.id}/reviews/${review.id}/add-review-image`}>
                                <AddReviewImageButton />
                            </NavLink>

                            <NavLink to={`/user/${sessionUser.id}/reviews/${review.id}/edit`}>
                                <EditReviewButton />
                            </NavLink>

                            <DeleteReviewButton reviewId={review.id} />
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}
