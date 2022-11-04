import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";
import * as reviewsActions from "../../store/reviews";

export default function AddReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { spotId } = useParams()
    const spotData = useSelector((state) => state.spots.singleSpot);
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(1);
    const [url, setUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);


    if (!sessionUser) {
        alert("You must be logged in to add a review!");
        history.push("/");
    }

    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(spotId));

        return () => dispatch(spotsActions.clearData());
    }, [dispatch, spotId]);

    useEffect(() => {
        const errors = [];
        // if (review.length <= 0) errors.push("Review text is required");
        if (stars < 1 || stars > 5) errors.push("Stars must be an integer from 1 to 5");

        setValidationErrors(errors);
    }, [review, stars]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];

        const newReview = {
            review,
            stars
        }
        try {
            const createdReview = await dispatch(reviewsActions.createReview(spotId, newReview, sessionUser, spotData));

            if (createdReview) {
                if (url.length) {
                    const newImg = { url }
                    try {
                        await dispatch(reviewsActions.createReviewImg(createdReview.id, newImg));
                    }

                    catch (res) {
                        const data = await res.json();
                        if (data) errors.push(data.message);
                    }
                }

                setValidationErrors([]);
                history.push(`/spots/${createdReview.spotId}`);
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

    return (
        <div className='container--form'>
            <h1>Create a Review!</h1>

            <form onSubmit={handleSubmit} className="form" id="form--create-review">
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
                        placeholder='Review Image url'
                        className='form-field'
                        id='form-field--image'
                    />

                    {url && <img className='create-review-img-url-preview' src={url} alt={url} onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />}
                </div>

                <button
                    type="submit"
                    disabled={validationErrors.length}
                    className='submit-button'
                    id='button--create-review-submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
