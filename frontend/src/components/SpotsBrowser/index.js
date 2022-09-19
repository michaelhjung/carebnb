import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';

export default function SpotsBrowser() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(spotsActions.getSpots());
    }, [dispatch]);

    console.log("FINAL SPOTS RETURNED AFTER FETCH:", spots);

    if (!spots) return null;
    return (
        <main className='container--spots'>
            {Object.values(spots).map(spot => (
                <div key={spot.id}>{spot.name}</div>
            ))}
        </main>
    )
}
