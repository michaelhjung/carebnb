import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../store/reviews";

export default function AddReviewImageForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { reviewId } = useParams()
    const userReviews = useSelector(state => state.reviews.user);
    let spotId;
    if (userReviews) spotId = userReviews[reviewId].Spot.id;
    const [url, setUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    if (!sessionUser) {
        alert("You must be logged in to add a review image!");
        history.push("/");
    }

    useEffect(() => {
        dispatch(reviewsActions.getUserReviews());
        dispatch(reviewsActions.getSpotReviews(spotId));

        return () => dispatch(reviewsActions.clearData());
    }, [dispatch, reviewId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (url.length) {
            const newImg = { url }
            try {
                await dispatch(reviewsActions.createReviewImg(reviewId, newImg));
            }

            catch (res) {
                const data = await res.json();
                if (data) return setValidationErrors([data.message]);
            }
        }

        setValidationErrors([]);
        history.push(`/user/${sessionUser.id}/reviews`);
    };

    return (
        <div className='container--form'>
            <h1>Add a Review Image!</h1>

            <form onSubmit={handleSubmit} className="form" id="form--create-review">
                {validationErrors.length > 0 && (
                    <ul className="list--errors">
                        {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                    </ul>
                )}
                <div className='container--form-fields'>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='Review Image url'
                        className='form-field'
                        id='form-field--image'
                    />

                    {url && <img className='create-review-img-url-preview' src={url} alt={url} />}
                </div>

                <button
                    type="submit"
                    disabled={validationErrors.length}
                    className='submit-button'
                    id='button--add-review-img-submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
