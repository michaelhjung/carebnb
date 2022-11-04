import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../store/reviews";
import DeleteReviewImageButton from '../UserReviews/DeleteReviewImageButton';

export default function EditReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { reviewId } = useParams()
    const userReviews = useSelector(state => state.reviews.user);
    let currReview;
    if (userReviews) currReview = userReviews[reviewId];
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(1);
    const [url, setUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const handleDeleteClick = async (e, reviewId, reviewImgId) => {
        e.preventDefault();
        try {
            await dispatch(reviewsActions.deleteReviewImg(reviewId, reviewImgId))
        }

        catch (res) {
            const data = await res.json();
            if (data) return alert(data.message);
        }
    }

    if (!sessionUser) {
        alert("You must be logged in to add a review!");
        history.push("/");
    }

    useEffect(() => {
        dispatch(reviewsActions.getUserReviews());

        return () => dispatch(reviewsActions.clearData());
    }, [dispatch, reviewId]);

    useEffect(() => {
        const errors = [];
        // if (review.length <= 0) errors.push("Review text is required");
        if (stars < 1 || stars > 5) errors.push("Stars must be an integer from 1 to 5");

        setValidationErrors(errors);
    }, [review, stars]);

    useEffect(() => {
        if (currReview) {
            setReview(currReview.review || '');
            setStars(currReview.stars || 1);
        }
    }, [currReview]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = []

        const updatedReviewData = {
            review,
            stars
        }
        try {
            const updatedReview = await dispatch(reviewsActions.updateReview(reviewId, updatedReviewData, sessionUser, currReview.Spot));

            if (updatedReview) {
                if (url.length) {
                    const newImg = { url }
                    try {
                        await dispatch(reviewsActions.createReviewImg(updatedReview.id, newImg));
                    }

                    catch (res) {
                        const data = await res.json();
                        if (data) errors.push(data.message);
                    }
                }

                setValidationErrors([]);
                history.push(`/spots/${updatedReview.spotId}`);
            }
        }

        catch (res) {
            const data = await res.json();
            if (data) {
                errors.push(data.message);
                return setValidationErrors(errors);
            }
        }
    };

    if (!currReview || !Object.values(currReview)) return null;
    return (
        <div className='container--form'>
            <h1>Edit your Review!</h1>

            <form onSubmit={handleSubmit} className="form" id="form--edit-review">
                {validationErrors.length > 0 && (
                    <ul className="list--errors">
                        {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                    </ul>
                )}
                <div className='container--form-fields'>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        placeholder='Write your review here.'
                        className='form-field'
                        id='form-field--review'
                        rows='8'
                    ></textarea>

                    <select
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                        className='form-field'
                        id='form-field--stars'
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>

                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='Add a Review Image url'
                        className='form-field'
                        id='form-field--image'
                    />

                    {url && (
                        <>
                            <h2 className='title--edit-review-preview-img'>Preview of Review Image to Add:</h2>
                            <img className='edit-review-img-url-preview' src={url} alt={url} />
                        </>
                    )}

                    {currReview.ReviewImages && (
                        <div className='container--edit-review-current-imgs'>
                            {currReview.ReviewImages.length > 0 && (
                                <>
                                    <h2 className='title--edit-review-current-imgs'>Current Review Images:</h2>
                                    <div className='edit-review-images'>{currReview.ReviewImages && currReview.ReviewImages.map(img => (
                                        <div className='edit-review-images-delete'>
                                            <img className='review-img' id='edit-review-img' src={img.url} alt={img.id} />
                                            <button onClick={(e) => handleDeleteClick(e, currReview.id, img.id)} id="edit-rev-delete-rev-img">Delete Image</button>
                                            {/* <DeleteReviewImageButton reviewId={currReview.id} reviewImgId={img.id} /> */}
                                        </div>
                                    ))}</div>
                                </>
                            )}

                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={validationErrors.length}
                    className='submit-button'
                    id='button--edit-review-submit'
                >
                    Update Review
                </button>
            </form>
        </div>
    );
}
