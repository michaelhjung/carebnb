import React from 'react'
import { NavLink } from 'react-router-dom';

// NOTE: THIS COMPONENT IS NESTED UNDER SPOTS BROWSER

export default function SpotCard({ spot }) {
    return (
        <>
            <NavLink to={`/spots/${spot.id}`} className="link--spot">
                <div className='container--spot-card--img'>
                    <img src={spot.previewImage} alt={spot.description} className="spot-card--img" />
                </div>
            </NavLink>
            <div className='user-spot-card--info'>
                <div className='spot-card--info-row-1'>
                    <div className='spot-card--info-location'>{`${spot.city}, ${spot.state}`}</div>
                    <div className='spot-card--info-avgRating'>
                        <i className="fa-solid fa-star icon--star fa-xs" />
                        {" "}
                        {spot.avgRating && (spot.avgRating) ? Number(spot.avgRating).toFixed(1) : 'New'}
                    </div>
                </div>
                {console.log("SPOT", spot)}
                <div className='spot-card--info-row-2 spot-card--info-country-container'>
                    <span id='spot-card--info-country'>{spot.country}</span>
                </div>
                <div className='spot-card--info-row-3 spot-card--info-name-container'>
                    <span id='spot-card--info-name'>{spot.name}</span>
                </div>
                <div className='spot-card--info-row-4 spot-card--info-price-container'>
                    <span id='spot-card--info-price'>${spot.price}</span> night
                </div>
            </div>
        </>
    )
}
