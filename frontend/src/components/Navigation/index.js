import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import './Navigation.css';
import logo from '../../logo/carebnb-logo-v5.png';

function Navigation() {
    let welcomeBanner;
    const sessionUser = useSelector(state => state.session.user);
    const checkSession = () => (sessionUser) ? welcomeBanner = `${sessionUser.firstName}` : welcomeBanner = `Welcome to Carebnb!`;
    checkSession();

    useEffect(() => {
        const profilePic = document.getElementById('profile-icon-user');
        if (sessionUser) profilePic.classList.add('logged-in-user-icon');
        if (!sessionUser) profilePic.classList.remove('logged-in-user-icon');

        return () => profilePic.classList.remove('logged-in-user-icon');
    }, [sessionUser]);

    return (
        <header>
            <nav>
                <div className='navbar--left'>
                    <NavLink exact to="/" className='link--home'>
                        <img src={logo} className='logo' alt="carebnb-logo" onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"} />
                    </NavLink>
                </div>
                {/* {
                    (sessionUser) ? <div className='navbar--middle'>Welcome, <span id='welcome-banner-name'>{welcomeBanner}</span>!</div>
                     : <div className='navbar--middle'>{welcomeBanner}</div>
                } */}
                <div className='navbar--right'>
                    <NavLink to="/create-spot" className='link--create-spot'>
                        <button className='button button--create-spot'>Create a Spot</button>
                    </NavLink>
                    <ProfileButton />
                </div>
            </nav>
        </header>
    );
}

export default Navigation;
