import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUserButton from './DemoUserButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='profile-drop-div'>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
                <DemoUserButton />
            </div>
        );
    }

    return (
        <ul>
            <li>
                <NavLink exact to="/">
                    <img src="https://bit.ly/3xArrqL" className='home-logo' alt="airbnb-logo" />
                </NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
