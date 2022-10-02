import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";

export default function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    if (!sessionUser) {
        alert("You must be logged in to create a spot!");
        history.push("/");
    }

    useEffect(() => {
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

        if (Number.isNaN(Number(price)) && Number(price) !== 0 && price.length !== 0) errors.push("Please enter a valid price");
        if ((Number(price)) < 0 && price.length !== 0) errors.push("The price cannot be negative... but if you're feeling generous, you can make it free :)");

        setValidationErrors(errors);
    }, [name, lat, lng, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSpot = {
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
            const createdSpot = await dispatch(spotsActions.createSpot(newSpot));
            if (createdSpot) {
                if (url.length) {
                    const newImg = { url, preview: true }
                    try {
                        const createdImg = await dispatch(spotsActions.addSpotImg(createdSpot.id, newImg));
                        if (createdImg) setValidationErrors([]);
                    }
                    catch (res) {
                        const data = await res.json();
                        if (data && data.errors) return setValidationErrors(data.errors);
                    }
                }

                setValidationErrors([]);
                history.replace(`/spots/${createdSpot.id}`);
            }
        }

        catch (res) {
            const data = await res.json();
            if (data && data.errors) return setValidationErrors(data.errors);
        }
    };

    return (
        <div className='container--form'>
            <h1>Create a Spot!</h1>

            <form onSubmit={handleSubmit} className="form" id="form--create-spot">
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

                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        placeholder='Preview Image url'
                        className='form-field'
                        id='form-field--image'
                    />

                    {url && <img className='create-spot-img-url-preview' src={url} alt={url} />}
                </div>

                <button
                    type="submit"
                    disabled={validationErrors.length}
                    className='submit-button'
                    id='button--create-spot-submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
