import React from 'react';
import { useParams } from 'react-router-dom';

export default function SpotDetails({ spots }) {
    const { spotId } = useParams();
    const spot = spots[spotId];

    if (!spot) return null;

    return (
        <div>
            SpotDetails for spot id: {spotId}
        </div>
    )
}
