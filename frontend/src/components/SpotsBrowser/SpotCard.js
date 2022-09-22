import React from 'react'
import { NavLink } from 'react-router-dom';

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
                        <i className="fa-solid fa-star icon--star" />
                        {" "}
                        {spot.avgRating && (spot.avgRating) ? Number(spot.avgRating).toFixed(2) : 'New'}
                    </div>
                </div>
                <div className='spot-card--info-row-2 spot-card--info-price-container'>
                    <span id='spot-card--info-price'>${spot.price}</span> night
                </div>
            </div>
        </>
    )
}
