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

    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        const errors = [];

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
    }, [lat, lng, price]);

    useEffect(() => {
        if (spot) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            setLat(spot.lat);
            setLng(spot.lng);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
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
                history.replace(`/spots/${updatedSpot.id}`);
            }
        }

        catch (res) {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
        }
    };

    if (!sessionUser) return <Redirect to="/" />;
    if (!Object.entries(spot).length) return null;

    return (
        <div className='container--form'>
            <h1>Update your Spot!</h1>

            <form onSubmit={handleSubmit} className="form form--create-spot">
                {validationErrors.length > 0 && (
                    <ul className="list--errors">
                        {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                    </ul>
                )}
                <div className='container--form-fields-only'>
                    <div id='container--form-field-spot--name' className='container--form-field'>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Spot Name'
                            className='form-field'
                            id='form-field--name'
                        />
                    </div>
                    <div id='container--form-field-spot--address' className='container--form-field'>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder='Address'
                            className='form-field'
                            id='form-field--address'
                        />
                    </div>
                    <div id='container--form-field-spot--city' className='container--form-field'>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder='City'
                            className='form-field'
                            id='form-field--city'
                        />
                    </div>
                    <div id='container--form-field-spot--state' className='container--form-field'>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder='State'
                            className='form-field'
                            id='form-field--state'
                        />
                    </div>
                    <div id='container--form-field-spot--country' className='container--form-field'>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder='Country'
                            className='form-field'
                            id='form-field--country'
                        />
                    </div>
                    <div id='container--form-field-spot--lat' className='container--form-field'>
                        <input
                            type="text"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                            placeholder='Latitude'
                            className='form-field'
                            id='form-field--lat'
                        />
                    </div>
                    <div id='container--form-field-spot--lng' className='container--form-field'>
                        <input
                            type="text"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            required
                            placeholder='Longitude'
                            className='form-field'
                            id='form-field--lng'
                        />
                    </div>
                    <div id='container--form-field-spot--desc' className='container--form-field'>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder='Description'
                            className='form-field'
                            id='form-field--desc'
                            rows='8'
                        ></textarea>
                    </div>
                    <div id='container--form-field-spot--price' className='container--form-field'>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder='Price'
                            className='form-field'
                            id='form-field--price'
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={validationErrors.length}
                    className='submit-button'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
