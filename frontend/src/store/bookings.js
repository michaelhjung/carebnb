import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const LOAD_USER_BOOKINGS = '/bookings/LOAD_USER_BOOKINGS';
const LOAD_SPOT_BOOKINGS = '/bookings/LOAD_SPOT_BOOKINGS';
const ADD_BOOKING = '/bookings/ADD_BOOKING';
// const EDIT_BOOKING = '/bookings/EDIT_BOOKING';
const REMOVE_BOOKING = '/bookings/REMOVE_BOOKING';


/* ---------------------------- ACTION CREATORS: ---------------------------- */
const loadUserBookings = (bookings) => ({
    type: LOAD_USER_BOOKINGS,
    payload: bookings
});

const loadSpotBookings = (bookings) => ({
    type: LOAD_SPOT_BOOKINGS,
    payload: bookings
});

const add = (bookingData) => ({
    type: ADD_BOOKING,
    payload: bookingData
});

// const editBooking = (bookingData) => ({
//     type: EDIT_BOOKING,
//     payload: bookingData
// })

const removeBooking = (bookingId) => ({
    type: REMOVE_BOOKING,
    payload: bookingId
});


/* ------------------------- THUNK ACTION CREATORS: ------------------------- */
export const getUserBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`);

    if (response.ok) {
        const userBookings = await response.json();
        // console.log("JSONIFIED bookings DATA AFTER THUNK:", userBookings);
        dispatch(loadUserBookings(userBookings));
        return userBookings;
    }
}

export const getSpotBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const spotBookings = await response.json();
        // console.log("JSONIFIED SPOT BOOKINGS DATA AFTER THUNK:", spotBookings);
        dispatch(loadSpotBookings(spotBookings));
        return spotBookings;
    }
}

export const createBooking = (spotId, bookingData) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    });

    if (response.ok) {
        const newBooking = await response.json();
        // console.log("JSONIFIED NEW-SPOT DATA AFTER THUNK:", newBooking);
        dispatch(add(newBooking));
        return newBooking;
    }
}

// export const updateBooking = (bookingId, bookingData) => async dispatch => {
//     const response = await csrfFetch(`/api/bookings/${bookingId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bookingData)
//     });

//     if (response.ok) {
//         const updatedBookingData = await response.json();
//         // console.log("JSONIFIED UPDATED SPOT DATA AFTER THUNK:", updatedBookingData);
//         dispatch(editBooking(updatedBookingData));
//         return updatedBookingData;
//     }
// }

export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const successMessage = await response.json();
        // console.log("THIS IS THUNK SUCCESS MSG:", successMessage, bookingId);
        dispatch(removeBooking(bookingId));
        return successMessage;
    }
}


/* -------------------------------- REDUCER: -------------------------------- */
const initialState = { user: null, spot: null };

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_BOOKINGS:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            // console.log("LOAD_USER_BOOKINGS ACTION.PAYLOAD IS:", action.payload);
            const newUserBookings = {};
            action.payload.Bookings.forEach(booking => newUserBookings[booking.id] = booking);
            newState.user = newUserBookings;
            // console.log("NEWSTATE AFTER LOAD_USER_BOOKINGS ACTION:", newState);
            return newState;
        case LOAD_SPOT_BOOKINGS:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            // console.log("LOAD_SPOT_BOOKINGS ACTION.PAYLOAD IS:", action.payload);
            const newSpotBookings = {};
            action.payload.Bookings.forEach(booking => newSpotBookings[booking.id] = booking);
            newState.spot = newSpotBookings;
            // console.log("NEWSTATE AFTER LOAD_SPOT_BOOKINGS ACTION:", newState);
            return newState;
        case ADD_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            const newBooking = { ...action.payload };
            newState.user[action.payload.id] = newBooking;
            // console.log("NEWSTATE AFTER ADD_BOOKING ACTION:", newState);
            return newState;
        // case EDIT_BOOKING:
        //     newState = { ...state };
        //     const updatedBooking = { ...action.payload };
        //     newState.allbookings[action.payload.id] = updatedBooking;
        //     // console.log("NEWSTATE AFTER ADD_BOOKING ACTION:", newState);
        //     return newState;
        case REMOVE_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            delete newState.user[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER REMOVE_BOOKING ACTION:", newState);
            return newState;
        default:
            return state;
    }
};

export default bookingsReducer;
