import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignUpButton from "./SignUpButton";
import DemoUserButton from './DemoUserButton';
import * as sessionActions from '../../store/session';

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

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
        history.push("/");
    };

    return (
        <div className='container--profile'>
            <button onClick={openMenu} className="button button--profile">
                <i className="fa-solid fa-bars icon--profile" />
                <i className="fas fa-user-circle icon--profile" />
            </button>
            {sessionUser && showMenu && (
                <ul className="list--profile-dropdown">
                    <li className="button--dropdown-item button--dropdown-item-user-data">Welcome, {sessionUser.username}</li>
                    <li>
                        <NavLink to={`/user/${sessionUser.id}/spots`}>
                            <button id="button--user-spots" className="button--dropdown-item button--dropdown-item-link">My Spots</button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/user/${sessionUser.id}/bookings`}>
                            <button id="button--user-bookings" className="button--dropdown-item button--dropdown-item-link">My Bookings</button>
                        </NavLink>
                    </li>
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
                        <SignUpButton />
                    </NavLink>
                    <DemoUserButton />
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
