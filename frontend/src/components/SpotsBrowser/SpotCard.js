import React from 'react'

export default function SpotCard({ spot }) {
  return (
    <>
        <div className='container--spot-card--img'>
            <img src={spot.previewImage} alt={spot.description} className="spot-card--img" />
        </div>
        <div className='spot-card--info'>
            <div className='spot-card--info-avgRating'>
                <i className="fa-solid fa-star icon--star" />
                {spot.avgRating && Number(spot.avgRating).toFixed(1)}
            </div>
            <div className='spot-card--info-location'>{`${spot.city}, ${spot.state}`}</div>
            <div className='spot-card--info-price'>${spot.price}</div>
        </div>
    </>
  )
}
