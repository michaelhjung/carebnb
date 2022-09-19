import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
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
    console.log("SPOTS ARRAY INDEX 0:", spotsArr[0]);

    return (
        <main className='container--spots'>

        </main>
    )
}
