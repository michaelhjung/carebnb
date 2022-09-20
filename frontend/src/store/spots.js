import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const LOAD_ALL = '/spots/LOAD_ALL';
const LOAD_ONE = '/spots/LOAD_ONE';
const ADD_ONE = '/spots/ADD_ONE';
const ADD_IMG = '/spots/ADD_IMG';
const UPDATE = '/spots/UPDATE';
const REMOVE_SPOT = '/spots/REMOVE_SPOT';


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

const addImg = (spotData, imgData) => ({
    type: ADD_IMG,
    payload: {
        spotData,
        imgData
    }
});

const editSpot = (spotData) => ({
    type: UPDATE,
    payload: spotData
})

const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
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

export const createSpot = (spotData) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotData)
    });

    if (response.ok) {
        const newSpot = await response.json();
        // console.log("JSONIFIED NEW-SPOT DATA AFTER THUNK:", newSpot);
        dispatch(addOne(newSpot));
        return newSpot;
    }
}

export const addSpotImg = (spotId, imgData) => async dispatch => {
    const responseGetSpot = await fetch(`/api/spots/${spotId}`);
    let spot;
    if (responseGetSpot.ok) spot = await responseGetSpot.json();

    const responseAddImg = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imgData)
    });

    if (responseAddImg.ok) {
        const returnedImgData = await responseAddImg.json();
        // console.log("JSONIFIED SPOT IMG DATA AFTER THUNK:", img);
        await dispatch(addImg(spot, returnedImgData));
        return returnedImgData;
    }
}

export const updateSpot = (spotId, spotData) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotData)
    });

    if (response.ok) {
        const updatedSpot = await response.json();
        // console.log("JSONIFIED UPDATED SPOT DATA AFTER THUNK:", updatedSpot);
        dispatch(editSpot(updatedSpot));
        return updatedSpot;
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const successMessage = await response.json();
        dispatch(removeSpot(spotId));
        return successMessage;
    }
}


/* -------------------------------- REDUCER: -------------------------------- */
const initialState = { allSpots: null, singleSpot: null };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            newState = { ...state };
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllSpots = {};
            action.payload.Spots.forEach(spot => newAllSpots[spot.id] = spot);
            newState.allSpots = newAllSpots;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        case LOAD_ONE:
            newState = { ...state };
            // console.log("LOAD_ONE ACTION.PAYLOAD IS:", action.payload);
            const newSingleSpot = { ...action.payload };
            newState.singleSpot = newSingleSpot;
            // console.log("NEWSTATE AFTER LOAD_ONE ACTION:", newState);
            return newState;
        case ADD_ONE:
            newState = { ...state };
            const newSpot = { ...action.payload };
            newState.allSpots[action.payload.id] = newSpot;
            // console.log("NEWSTATE AFTER ADD_ONE ACTION:", newState);
            return newState;
        case ADD_IMG:
            newState = { ...state };
            newState.singleSpot = action.payload.spotData;
            newState.singleSpot.spotImages.push(action.payload.imgData);
            // console.log("NEWSTATE AFTER ADD_ONE ACTION:", newState);
            return newState;
        case UPDATE:
            newState = { ...state };
            const updatedSpot = { ...action.payload };
            newState.allSpots[action.payload.id] = updatedSpot;
            // console.log("NEWSTATE AFTER ADD_ONE ACTION:", newState);
            return newState;
        case REMOVE_SPOT:
            newState = { ...state };
            delete newState.allSpots[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER REMOVE_SPOT ACTION:", newState);
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
