import React from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function DemoUserButton() {
    const dispatch = useDispatch();
    const clickHandler = (e) => {
        e.preventDefault();
        const demoUserInfo = { credential: 'demouser', password: 'password' };
        dispatch(sessionActions.login(demoUserInfo));
    }

    return (
        <button
            onClick={clickHandler}
            className="button--dropdown-item button--dropdown-item-link"
            id="demo-user-button"
        >
                Demo User
        </button>
    );
}

export default DemoUserButton;
