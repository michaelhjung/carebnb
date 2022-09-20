import React from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';

export default function DeleteSpotButton({ user, spot }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = async () => {
        await dispatch(spotsActions.deleteSpot(spot.id));
        // <Redirect to={`/user/${user.id}/spots`} />
        history.replace(`/user/${user.id}/spots`);
    }

    return (
        <button onClick={handleClick} id='spot-card--button-delete' className='spot-card--button'>Delete Spot</button>
    )
}
