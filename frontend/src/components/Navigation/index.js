import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import './Navigation.css';
import logo from '../../logo/carebnb-logo-v5.png';

function Navigation() {
    let welcomeBanner;
    const sessionUser = useSelector(state => state.session.user);
    const checkSession = () => (sessionUser) ? welcomeBanner = `Welcome, ${sessionUser.firstName}!` : welcomeBanner = `Welcome to Carebnb!`;
    checkSession();

    return (
        <header>
            <div className='navbar--left'>
                <NavLink exact to="/" className='link--home'>
                    <img src={logo} className='logo' alt="carebnb-logo" />
                </NavLink>
            </div>
            <div className='navbar--middle'>{welcomeBanner}</div>
            <div className='navbar--right'>
                <NavLink to="/create-spot" className='link--create-spot'>
                    <button className='button button--create-spot'>Create a Spot</button>
                </NavLink>
                <ProfileButton />
            </div>
        </header>
    );
}

export default Navigation;
