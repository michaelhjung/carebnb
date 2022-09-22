import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SpotsBrowser";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import UserSpots from "./components/UserSpots";
import AddSpotImageForm from "./components/AddSpotImageForm";
import EditSpotForm from "./components/EditSpotForm";
import UserBookings from "./components/UserBookings";
import PageNotFound from "./components/PageNotFound";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div id="container--page">
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <main id='page-content'>
                    <Switch>
                        <Route exact path="/">
                            <SpotsBrowser />
                        </Route>

                        <Route exact path="/spots/:spotId">
                            <SpotDetails />
                        </Route>

                        <Route path="/create-spot">
                            <CreateSpotForm />
                        </Route>

                        <Route exact path="/user/:userId/spots/:spotId/add-image">
                            <AddSpotImageForm />
                        </Route>

                        <Route exact path='/user/:userId/spots/:spotId/edit'>
                            <EditSpotForm />
                        </Route>

                        <Route exact path="/user/:userId/spots">
                            <UserSpots />
                        </Route>

                        <Route exact path="/user/:userId/bookings">
                            <UserBookings />
                        </Route>

                        <Route>
                            <PageNotFound />
                        </Route>
                    </Switch>
                </main>
            )}
            <footer>
                <div id='footer-left'>An Airbnb clone by Michael Jung</div>
                <div id='footer-right'>
                    <div id='footer-imgs'>
                        <a id='linked-in' className='footer-links' href='https://www.linkedin.com/in/michael-h-jung/' target='_blank' rel='noreferrer'>
                            <i className="fa-brands fa-linkedin fa-xl" />
                        </a>
                        <a id='github' className='footer-links' href='https://github.com/michaelhjung' target='_blank' rel='noreferrer'>
                            <i className="fa-brands fa-github fa-xl" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
