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

    console.log("SPOT ID IS:", spotId);
    console.log("SESSION USER IS:", sessionUser);
    console.log("SPOT IS:", spot);

    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(spotId));
    }, [dispatch, spotId]);

    // THE FOLLOWING HAS A RENDER DELAY BECAUSE NEW SPOT STATE HAS NOT RENDERED YET WHEN PAGE LOADS
    // useEffect(() => {
    //     if (spot) {
    //         setAddress(spot.address);
    //         setCity(spot.city);
    //         setState(spot.state);
    //         setCountry(spot.country);
    //         setLat(spot.lat);
    //         setLng(spot.lng);
    //         setName(spot.name);
    //         setDescription(spot.description);
    //         setPrice(spot.price);
    //     }
    // }, []);

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

    if (!sessionUser) return <Redirect to="/" />;

    // if (spot) {
    //     if (sessionUser.id.toString() !== spot.ownerId.toString()) {
    //         alert("You do not have access to update this spot");
    //         history.replace("/");
    //     }
    // }

    if (!spot) history.replace("/page-not-found");

    const handleSubmit = async (e) => {
        e.preventDefault();

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

    return (
        <form onSubmit={handleSubmit} className="form--create-spot">
            {validationErrors.length > 0 && (
                <ul className="list--errors">
                    {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                </ul>
            )}
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                Latitude
                <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />
            </label>
            <label>
                Longitude
                <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Description
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </label>
            <label>
                Price
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
