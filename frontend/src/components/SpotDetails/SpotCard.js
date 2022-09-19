import React from 'react'

export default function SpotCard({ spot }) {
  return (
    <>
        {spot.name}
        <img src={spot.previewImage} alt={spot.description} className="spot-card--img" />
        <div className='spot-card--info'>
            <div className='spot-card--info-avgRating'>
                <i class="fa-solid fa-star icon--star" />
                {spot.avgRating && Number(spot.avgRating).toFixed(1)}
            </div>
            <div className='spot-card--info-location'>{`${spot.city}, ${spot.state}`}</div>
            <div className='spot-card--info-price'>${spot.price}</div>
        </div>
    </>
  )
}
