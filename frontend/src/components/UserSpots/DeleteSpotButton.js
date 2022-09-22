import React from 'react'
import { useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';

export default function DeleteSpotButton({ user, spot }) {
    const dispatch = useDispatch();

    const handleClick = async () => {
        await dispatch(spotsActions.deleteSpot(spot.id));
    }

    return (
        <button onClick={() => handleClick()}
            id='spot-card--button-delete'
            className='user-spot-card--button'>
                Delete Spot
        </button>
    )
}
