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
        <div className='container--profile'>
            <button onClick={openMenu} className="button button--profile">
                <i className="fa-solid fa-bars icon--profile" />
                <i className="fas fa-user-circle icon--profile" />
            </button>
            {sessionUser && showMenu && (
                <ul className="list--profile-dropdown">
                    <li>
                        <NavLink to="/my-spots">
                            <button className="button--dropdown-item button--dropdown-item-link">My Spots</button>
                        </NavLink>
                    </li>
                    <li className="button--dropdown-item">{sessionUser.username}</li>
                    <li className="button--dropdown-item">{sessionUser.email}</li>
                    <li>
                        <button onClick={logout} className="button--dropdown-item button--dropdown-item-link">Log Out</button>
                    </li>
                </ul>
            )}
            {!sessionUser && showMenu && (
                <ul className="list--profile-dropdown">
                    <LoginFormModal
                        setShowMenu={setShowMenu}
                        closeMenu={closeMenu}
                    />
                    <NavLink to="/signup">
                        <button className="signup-button button--dropdown-item button--dropdown-item-link">
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
