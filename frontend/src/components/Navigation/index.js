import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './Navigation.css';
import logo from '../../logo/carebnb-logo-v5.png';

function Navigation() {

    return (
        <header>
            <div className='navbar--left'>
                <NavLink exact to="/" className='link--home'>
                    <img src={logo} className='logo' alt="carebnb-logo" />
                </NavLink>
            </div>
            <div className='navbar--right'>
                <NavLink to="/api/spots" className='link--create-spot'>
                    <button className='button button--create-spot'>Create a Spot</button>
                </NavLink>
                <ProfileButton />
            </div>
        </header>
    );
}

export default Navigation;
