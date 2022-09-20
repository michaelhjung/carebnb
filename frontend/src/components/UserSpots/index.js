import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';
import SpotCard from '../SpotDetails/SpotCard';

export default function UserSpots() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const userSpots = useSelector(state => state.spots.allSpots);
    // useEffect(() => {
    //     dispatch(spotsActions.getUserSpots());
    // }, [dispatch]);

    // console.log("USER SPOTS:", userSpots);

    // if (!userSpots) return null;

    // return (
    //     <>
    //         <h1>Welcome, {sessionUser.firstName}. Here are your spots:</h1>
    //         <main className='container--spots'>
    //             {Object.values(userSpots).map(spot => (
    //                 <div key={spot.id} className="spot-card">
    //                     <NavLink to={`/spots/${spot.id}`} className="link--spot">
    //                         <SpotCard spot={spot} />
    //                     </NavLink>
    //                 </div>
    //             ))}
    //         </main>
    //     </>
    // )
}
