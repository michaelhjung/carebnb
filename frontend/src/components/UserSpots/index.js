import React from 'react'
import { useSelector } from 'react-redux';

export default function UserSpots() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>UserSpots</div>
    )
}
