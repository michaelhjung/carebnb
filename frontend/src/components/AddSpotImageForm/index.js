import React, { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';

export default function AddSpotImageForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const [url, setUrl] = useState("");
    const [preview, setPreview] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    if (!sessionUser) {
        alert("You must be logged in to add an image!");
        return <Redirect to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newImg = { url, preview: Boolean(preview) }
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

    return (
        <form onSubmit={handleSubmit} className="form--add-img">
            <ul className="list--errors">
                {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
            </ul>
            <label>
                url
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </label>
            <label>
                preview
                <input
                    type="text"
                    value={preview}
                    onChange={(e) => setPreview(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
