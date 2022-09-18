import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';

export default function SpotsBrowser() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(spotsActions.getSpots());
    }, [dispatch]);
    const spots = useSelector(state => state.spots);
    const spotsArr = Object.values(spots);
    console.log("FINAL SPOTS RETURNED AFTER FETCH:", spots);
    console.log("SPOTS ARRAY:", spotsArr);

    return (
        <main className='spots-list-container'>

        </main>
    )
}
