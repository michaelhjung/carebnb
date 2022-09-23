import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm({ setShowMenu, closeMenu }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    useEffect(() => {
        const errors = [];

        if (email.length && (!email.includes("@") || !email.includes("."))) errors.push("Please provide a valid email.");
        if (firstName.length && firstName.length < 2) errors.push("Please provide a first name with at least 2 characters.");
        if (lastName.length && lastName.length < 2) errors.push("Please provide a last name with at least 2 characters.");
        if (username.length && password.length < 4) errors.push("Please provide a username with at least 4 characters.");
        if (password.length && password.length < 6) errors.push("Password must be 6 characters or more.");
        if (password && confirmPassword && password !== confirmPassword) errors.push("Confirm Password field must be the same as the Password field.");

        setValidationErrors(errors);
    }, [email, firstName, lastName, username, password, confirmPassword]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {

            try {
                const response = await dispatch(sessionActions.signup({ firstName, lastName, email, username, password }));
                if (response) {
                    setShowMenu(false);
                    setValidationErrors([]);
                }
            } catch (res) {
                const data = await res.json();
                const errors = [];
                if (data.errors) data.errors.forEach(error => errors.push(error));
                return setValidationErrors(errors);
            }
        }
        return setValidationErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="container--login-signup-forms" id="container--signup-form">
            <div className='title-login-signup title-signup container--login-signup-top'>
                Sign Up
            </div>

            <div className="border-div"></div>

            <div className="container--login-signup-bottom">

                <h1 className='welcome-login-signup welcome-signup'>Welcome to Carebnb</h1>

                <form onSubmit={handleSubmit} className="form--login-signup form--signup">
                    <ul className="list--errors">
                        {validationErrors.map((error, idx) => <li key={idx} className="error-li">{error}</li>)}
                    </ul>

                    <div className="container--login-signup-fields" id="container--signup-fields">
                        <div id="container--signup-field-first-name" className="container--login-signup-field container--signup-field" >
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="First Name"
                                className="login-signup-field signup-field"
                                id="signup-field--first-name"
                            />
                        </div>
                        <div id="container--signup-field-last-name" className="container--login-signup-field container--signup-field" >
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder="Last Name"
                                className="login-signup-field signup-field"
                                id="signup-field--last-name"
                            />
                        </div>
                        <div id="container--signup-field-email" className="container--login-signup-field container--signup-field" >
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email"
                                className="login-signup-field signup-field"
                                id="signup-field--email"
                            />
                        </div>
                        <div id="container--signup-field-username" className="container--login-signup-field container--signup-field" >
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Username"
                                className="login-signup-field signup-field"
                                id="signup-field--username"
                            />
                        </div>
                        <div id="container--signup-field-password" className="container--login-signup-field container--signup-field" >
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                                className="login-signup-field signup-field"
                                id="signup-field--password"
                            />
                        </div>
                        <div id="container--signup-field-confirm-password" className="container--login-signup-field container--signup-field" >
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm Password"
                                className="login-signup-field signup-field"
                                id="signup-field--confirm-password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        id='signup-submit-button'
                        className='login-signup-submit-button'
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
