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
        <button onClick={clickHandler}>Demo User</button>
    );
}

export default DemoUserButton;