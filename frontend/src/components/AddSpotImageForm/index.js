import React, { useState, useEffect } from 'react'
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';

export default function AddSpotImageForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const [url, setUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(spotId));
    }, [dispatch, spotId]);

    if (!sessionUser) {
        alert("You must be logged in to add an image!");
        return <Redirect to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newImg = { url, preview: false }
        try {
            const createdImg = await dispatch(spotsActions.addSpotImg(spotId, newImg));

            if (createdImg) {
                setValidationErrors([]);
                history.push(`/spots/${spotId}`);
            }
        }
        catch (res) {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
        }
    };

    if (!spot || !Object.entries(spot).length) return null;

    return (
        <div id='container--img-form'>
            <h1>Add an image to your Spot!</h1>
            <h2>{spot.name}</h2>
            <NavLink to={`/spots/${spotId}`}>
                <img
                    src={spot.spotImages[0] && spot.spotImages[0].url}
                    alt={spot.name}
                    id='add-img-spot-thumbnail'
                    onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"}
                />
            </NavLink>

            <form onSubmit={handleSubmit} className="form form--add-img">
                <ul className="list--errors">
                    {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                </ul>
                <div className='container--form-fields'>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        placeholder='image url'
                        className='form-field'
                        id='form-field--add-img-url'
                    />
                </div>

                <button
                    type="submit"
                    className='submit-button'
                    id='button--add-img-submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
