import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";

export default function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");
    const [img5, setImg5] = useState("");

    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(spotId));

        return () => dispatch(spotsActions.clearData());
    }, [dispatch, spotId]);

    useEffect(() => {
        if (spot) {
            const errors = [];
            if (name.length >= 50) errors.push("Name must be less than 50 characters");

            if (Number.isNaN(Number(lat)) ||
                (Number(lat)) > 90 ||
                (Number(lat)) < -90)
                errors.push("Latitude must be a number between -90.0 and 90.0");

            if (Number.isNaN(Number(lng)) ||
                (Number(lng)) > 180 ||
                (Number(lng)) < -180)
                errors.push("Longitude must be a number between -180.0 and 180.0");

            if (Number.isNaN(Number(price)) && Number(price) !== 0 && price) errors.push("Please enter a valid price");
            if ((Number(price)) < 0 && price.length !== 0) errors.push("The price cannot be negative... but if you're feeling generous, you can make it free :)");

            setValidationErrors(errors);
        }
    }, [name, lat, lng, price, spot]);

    useEffect(() => {
        if (spot) {
            setAddress(spot.address || '');
            setCity(spot.city || '');
            setState(spot.state || '');
            setCountry(spot.country || '');
            setLat(spot.lat || '');
            setLng(spot.lng || '');
            setName(spot.name || '');
            setDescription(spot.description || '');
            setPrice(spot.price || '');

            if (spot.spotImages) {
                if (spot.spotImages[0]) setImg1(spot.spotImages[0].url);
                if (spot.spotImages[1]) setImg2(spot.spotImages[1].url);
                if (spot.spotImages[2]) setImg3(spot.spotImages[2].url);
                if (spot.spotImages[3]) setImg4(spot.spotImages[3].url);
                if (spot.spotImages[4]) setImg5(spot.spotImages[4].url);
            }
        }
    }, [spot]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sessionUser.id.toString() !== spot.ownerId.toString()) {
            alert("You do not have access to update this spot");
            history.replace("/");
        }
        const spotDetails = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        try {
            const updatedSpot = await dispatch(spotsActions.updateSpot(spotId, spotDetails));
            if (updatedSpot) {
                setValidationErrors([]);
                history.push(`/spots/${updatedSpot.id}`);
            }
        }

        catch (res) {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
        }
    };

    const handleDeleteImg = async (imageId) => {
        try {
            const deleteImgMsg = await dispatch(spotsActions.deleteImg(imageId));
            if (deleteImgMsg) {
                alert("Successfully deleted image.");
            }
        }

        catch (res) {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
        }
    }

    const handleDeletePreviewImg = async (imageId) => {
        return alert("You cannot delete your preview image (yet)... functionality in progress!");
    }

    if (!sessionUser) return <Redirect to="/" />;
    if (!spot || !Object.entries(spot).length) return null;

    return (
        <div className='container--form'>
            <h1>Update your Spot!</h1>

            <form className="form form--create-spot">
                {validationErrors.length > 0 && (
                    <ul className="list--errors">
                        {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                    </ul>
                )}
                <div className='container--form-fields'>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Spot Name'
                        className='form-field'
                        id='form-field--name'
                    />

                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder='Address'
                        className='form-field'
                        id='form-field--address'
                    />

                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder='City'
                        className='form-field'
                        id='form-field--city'
                    />

                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder='State'
                        className='form-field'
                        id='form-field--state'
                    />

                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder='Country'
                        className='form-field'
                        id='form-field--country'
                    />

                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                        placeholder='Latitude'
                        className='form-field'
                        id='form-field--lat'
                    />

                    <input
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                        placeholder='Longitude'
                        className='form-field'
                        id='form-field--lng'
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder='Description'
                        className='form-field'
                        id='form-field--desc'
                        rows='8'
                    ></textarea>

                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder='Price'
                        className='form-field'
                        id='form-field--price'
                    />

                    {img1 && (
                        <div className='edit-spot-img-url-preview-div'>
                            <div className='edit-spot-img-text-container'>
                                <span className='edit-spot-img-url-preview-text'>Preview Image:</span>
                                <img className='edit-spot-img-url-preview' src={img1} alt={img1} onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                            </div>

                            <button onClick={() => handleDeletePreviewImg(spot.spotImages[0].id)} className='submit-button' id='button--delete-img'>Delete Image</button>
                        </div>
                    )}
                    {img2 && (
                        <div className='edit-spot-img-url-preview-div'>
                            <div className='edit-spot-img-text-container'>
                                <span className='edit-spot-img-url-preview-text'>Image 2:</span>
                                <img className='edit-spot-img-url-preview' src={img2} alt={img2} onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                            </div>

                            <button onClick={() => handleDeleteImg(spot.spotImages[1].id)} className='submit-button' id='button--delete-img'>Delete Image</button>
                        </div>
                    )}
                    {img3 && (
                        <div className='edit-spot-img-url-preview-div'>
                            <div className='edit-spot-img-text-container'>
                                <span className='edit-spot-img-url-preview-text'>Image 3:</span>
                                <img className='edit-spot-img-url-preview' src={img3} alt={img3} onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                            </div>

                            <button onClick={() => handleDeleteImg(spot.spotImages[2].id)} className='submit-button' id='button--delete-img'>Delete Image</button>
                        </div>
                    )}
                    {img4 && (
                        <div className='edit-spot-img-url-preview-div'>
                            <div className='edit-spot-img-text-container'>
                                <span className='edit-spot-img-url-preview-text'>Image 4:</span>
                                <img className='edit-spot-img-url-preview' src={img4} alt={img4} onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                            </div>

                            <button onClick={() => handleDeleteImg(spot.spotImages[3].id)} className='submit-button' id='button--delete-img'>Delete Image</button>
                        </div>
                    )}
                    {img5 && (
                        <div className='edit-spot-img-url-preview-div'>
                            <div className='edit-spot-img-text-container'>
                                <span className='edit-spot-img-url-preview-text'>Image 5:</span>
                                <img className='edit-spot-img-url-preview' src={img5} alt={img5} onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                            </div>

                            <button onClick={() => handleDeleteImg(spot.spotImages[4].id)} className='submit-button' id='button--delete-img'>Delete Image</button>
                        </div>
                    )}

                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={validationErrors.length}
                    className='submit-button'
                    id='button--edit-spot-submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
