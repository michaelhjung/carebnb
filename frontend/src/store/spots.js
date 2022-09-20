import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const LOAD_ALL = '/spots/LOAD_ALL';
const LOAD_ONE = '/spots/LOAD_ONE';
const ADD_ONE = '/spots/ADD_ONE';
const REMOVE_ONE = '/spots/REMOVE_ONE';


/* ---------------------------- ACTION CREATORS: ---------------------------- */
const loadAll = (spots) => ({
    type: LOAD_ALL,
    payload: spots
});

const loadOne = (spot) => ({
    type: LOAD_ONE,
    payload: spot
});

const addOne = (spotData) => ({
    type: ADD_ONE,
    payload: spotData
});

const removeOne = (spotId) => ({
    type: REMOVE_ONE,
    payload: spotId
});


/* ------------------------- THUNK ACTION CREATORS: ------------------------- */
export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        // console.log("JSONIFIED SPOTS DATA AFTER THUNK:", spots);
        dispatch(loadAll(spots));
    }
}

export const getUserSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);

    if (response.ok) {
        const userSpots = await response.json();
        // console.log("JSONIFIED SPOTS DATA AFTER THUNK:", spots);
        dispatch(loadAll(userSpots));
    }
}

export const getSingleSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        // console.log("JSONIFIED SINGLE SPOT DATA AFTER THUNK:", spot);
        dispatch(loadOne(spot));
    }
}

export const createSpot = (data) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // console.log("RESPONSE AFTER CREATE SPOT FETCH:", response);

    if (response.ok) {
        const newSpot = await response.json();
        // console.log("JSONIFIED NEW-SPOT DATA AFTER THUNK:", newSpot);
        dispatch(addOne(newSpot));
        return newSpot;
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeOne(spotId));
    }
}

/*
FUNCTIONALITIES TODO:
    - createSpot error handling
    - implement addSpotImage
    - implement editSpot
    - implement deleteSpot
*/


/* -------------------------------- REDUCER: -------------------------------- */
const initialState = { allSpots: null, singleSpot: null };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            newState = { ...state }
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllSpots = {};
            action.payload.Spots.forEach(spot => newAllSpots[spot.id] = spot);
            newState.allSpots = newAllSpots;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        case LOAD_ONE:
            newState = { ...state }
            // console.log("LOAD_ONE ACTION.PAYLOAD IS:", action.payload);
            const newSingleSpot = { ...action.payload };
            newState.singleSpot = newSingleSpot;
            // console.log("NEWSTATE AFTER LOAD_ONE ACTION:", newState);
            return newState;
        case ADD_ONE:
            newState = { ...state }
            const newSpot = { ...action.payload };
            newState.allSpots[action.payload.id] = newSpot;
            // console.log("NEWSTATE AFTER ADD_ONE ACTION:", newState);
            return newState;
        case REMOVE_ONE:
            newState = { ...state }
            delete newState.allSpots[action.payload]
            console.log("NEWSTATE AFTER REMOVE_ONE ACTION:", newState);
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
