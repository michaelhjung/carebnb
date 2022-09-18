import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import DemoUserButton from './DemoUserButton';
import * as sessionActions from '../../store/session';

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => setShowMenu(false);
    useEffect(() => {
        if (!showMenu) return;

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        document.removeEventListener('click', closeMenu);
        dispatch(sessionActions.logout());
        document.addEventListener('click', closeMenu);
    };

    return (
        <div className='profile-drop-div'>
            <button onClick={openMenu} className="profile-button">
                <i className="fas fa-user-circle" />
            </button>
            {sessionUser && showMenu && (
                <ul className="profile-dropdown">
                    <li>{sessionUser.username}</li>
                    <li>{sessionUser.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
            {!sessionUser && showMenu && (
                <ul className="profile-dropdown">
                    <LoginFormModal
                        setShowMenu={setShowMenu}
                        closeMenu={closeMenu}
                    />
                    <NavLink to="/signup">
                        <button className="signup-button">
                            Sign Up
                        </button>
                    </NavLink>
                    <DemoUserButton />
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
