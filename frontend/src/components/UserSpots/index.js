import React, { useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';
import SpotCard from '../SpotsBrowser/SpotCard';
import AddSpotImageButton from './AddSpotImageButton';
import EditSpotButton from './EditSpotButton';
import DeleteSpotButton from './DeleteSpotButton';

export default function UserSpots() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userSpots = useSelector(state => state.spots.allSpots);
    useEffect(() => {
        dispatch(spotsActions.getUserSpots());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />
    if (!userSpots) return null;

    return (
        <>
            <h1>Welcome, {sessionUser.firstName}. Here are your spots:</h1>
            <main className='container--spots'>
                {Object.values(userSpots).map(spot => (
                    <div key={spot.id} className="spot-card">
                        <NavLink to={`/spots/${spot.id}`} className="link--spot">
                            <SpotCard spot={spot} />
                        </NavLink>
                        <div className='spot-card--buttons'>
                            <NavLink to={`/user/${sessionUser.id}/spots/${spot.id}/add-image`}>
                                <AddSpotImageButton />
                            </NavLink>

                            <NavLink to={`/user/${sessionUser.id}/spots/${spot.id}/edit`}>
                                <EditSpotButton />
                            </NavLink>

                            <DeleteSpotButton spot={spot} user={sessionUser} />
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}
