import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './Navigation.css';
import logo from '../../logo/carebnb-logo-v4.png';

function Navigation() {

    return (
        <header>
            <NavLink exact to="/">
                <img src={logo} className='logo' alt="carebnb-logo" />
            </NavLink>
            <ProfileButton />
        </header>
    );
}

export default Navigation;
