import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './Navigation.css';
import LoginFormModal from '../LoginFormModal';

function Navigation() {

    return (
        <header>
            <NavLink exact to="/">
                <img src="https://bit.ly/3xArrqL" className='home-logo' alt="airbnb-logo" />
            </NavLink>
            <ProfileButton />
        </header>
    );
}

export default Navigation;
