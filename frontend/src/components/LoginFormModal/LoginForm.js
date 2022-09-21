import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm({ setShowMenu, closeMenu }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(sessionActions.login({ credential, password }));
            if (response) {
                setShowMenu(false);
                setValidationErrors([]);
            }
        } catch (res) {
            const data = await res.json();
            const errors = [];
            if (data) errors.push(data.message);

            setValidationErrors(errors);
        }
    };

    return (
        <div className='container--login-form'>
            <div className='login-title'>
                Log in
            </div>

            <h1 className='login-welcome'>Welcome to Carebnb</h1>
            <form onSubmit={handleSubmit} className="form--login">
                <ul className="list--errors">
                    {validationErrors.map((error, idx) => (
                        <li key={idx} className='error-li'>{error}</li>
                    ))}
                </ul>
                <div className="container--login-fields">
                    <div className="container--login-field container--login-field-credenital">
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            placeholder="Username or Email"
                            required
                            className="login-field login-field--credential"
                        />
                    </div>
                    <div className="container--login-field container--login-field-password">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="login-field login-field--password"
                        />
                    </div>
                </div>
                <button type="submit" id='login-submit-button'>Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;
