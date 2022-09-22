import React, { useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';
import SpotCard from '../SpotsBrowser/SpotCard';
import AddSpotImageButton from './AddSpotImageButton';
import EditSpotButton from './EditSpotButton';
import DeleteSpotButton from './DeleteSpotButton';
import './UserSpots.css';
// NOTE: CSS also being inherited from SpotsBrowser.css

export default function UserSpots() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userSpots = useSelector(state => state.spots.allSpots);
    useEffect(() => {
        dispatch(spotsActions.getUserSpots());

        return () => dispatch(spotsActions.clearData());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />
    if (!userSpots) return null;

    return (
        <>
            <h1>Hello, {sessionUser.firstName}. Here are your spots:</h1>
            <main id='container--user-spots' className='container--spots'>
                {Object.values(userSpots).map(spot => (
                    <div key={spot.id} className="spot-card user-spot-card">
                        <SpotCard spot={spot} />
                        <div className='user-spot-card--buttons-container'>
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
