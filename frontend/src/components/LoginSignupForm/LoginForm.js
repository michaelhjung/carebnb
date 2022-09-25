import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm({ setShowMenu, closeMenu }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        let loginFormDiv = document.querySelector('.container--login-form')

        if (validationErrors.length === 0) loginFormDiv.setAttribute('id', 'login-error-length-0');
        if (validationErrors.length === 1) loginFormDiv.setAttribute('id', 'login-error-length-1');

        return () => loginFormDiv.setAttribute('id', 'login-error-length-0');

    }, [validationErrors]);

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
        <div className='container--login-signup-forms container--login-form'>
            <div className='title-login-signup container--login-signup-top' id='title-login'>
                Log in
            </div>

            <div className="border-div"></div>

            <div className="container--login-signup-bottom">
                <h1 className='welcome-login-signup welcome-login'>Welcome to Carebnb</h1>

                <ul className="list--errors">
                    {validationErrors.map((error, idx) => (
                        <li key={idx} className='error-li'>{error}</li>
                    ))}
                </ul>

                <form onSubmit={handleSubmit} className="form--login-signup form--login">

                    <div className="container--login-signup-fields container--login-fields">
                        <div id="container--login-field-credential" className="container--login-signup-field container--login-field" >
                            <input
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                placeholder="Username or Email"
                                required
                                className="login-signup-field login-field"
                                id="login-field--credential"
                            />
                        </div>
                        <div id="container--login-field-password" className="container--login-signup-field container--login-field">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="login-signup-field login-field"
                                id="login-field--password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        id='login-submit-button'
                        className='login-signup-submit-button'
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
