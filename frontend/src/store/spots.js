// import { csrfFetch } from './csrf';
/* ----------------------------- ACTION TYPES: ----------------------------- */
const LOAD_ALL = '/spots/LOAD_ALL';
const LOAD_ONE = '/spots/LOAD_ONE';


/* ---------------------------- ACTION CREATORS: ---------------------------- */
const loadAll = (spots) => ({
    type: LOAD_ALL,
    payload: spots
});

const loadOne = (spot) => ({
    type: LOAD_ONE,
    payload: spot
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

export const getSingleSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        // console.log("JSONIFIED SINGLE SPOT DATA AFTER THUNK:", spot);
        dispatch(loadOne(spot));
    }
}


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
        default:
            return state;
    }
};

export default spotsReducer;
