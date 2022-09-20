import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SpotsBrowser";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import UserSpots from "./components/UserSpots";
import AddSpotImageForm from "./components/AddSpotImageForm";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                    <Route path="/signup">
                        <SignupFormPage />
                    </Route>

                    <Route exact path="/">
                        <SpotsBrowser />
                    </Route>

                    <Route exact path="/spots/:spotId">
                        <SpotDetails />
                    </Route>

                    <Route path="/create-spot">
                        <CreateSpotForm />
                    </Route>

                    <Route path="/my-spots">
                        <UserSpots />
                    </Route>

                    <Route path="/spots/:spotId/add-image">
                        <AddSpotImageForm />
                    </Route>

                    <Route>
                        Page Not Found!
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
