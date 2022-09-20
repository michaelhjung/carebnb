import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './SpotsBrowser.css'
import SpotCard from './SpotCard';
import * as spotsActions from '../../store/spots';

export default function SpotsBrowser() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);
    useEffect(() => {
        dispatch(spotsActions.getSpots());
    }, [dispatch]);

    if (!spots) return null;

    return (
        <>
            <main className='container--spots'>
                {Object.values(spots).map(spot => (
                    <div key={spot.id} className="spot-card">
                        <NavLink to={`/spots/${spot.id}`} className="link--spot">
                            <SpotCard spot={spot} />
                        </NavLink>
                    </div>
                ))}
            </main>
        </>
    )
}
