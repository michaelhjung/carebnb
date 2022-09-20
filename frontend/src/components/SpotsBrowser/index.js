import React from 'react';
import { NavLink } from 'react-router-dom';
import './SpotsBrowser.css'
import SpotCard from '../SpotDetails/SpotCard';

export default function SpotsBrowser({ spots }) {
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
