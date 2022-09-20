import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const LOAD_ALL = '/bookings/LOAD_ALL';
const ADD_BOOKING = '/bookings/ADD_BOOKING';
// const EDIT_BOOKING = '/bookings/EDIT_BOOKING';
const REMOVE_BOOKING = '/bookings/REMOVE_BOOKING';


/* ---------------------------- ACTION CREATORS: ---------------------------- */
const loadAll = (bookings) => ({
    type: LOAD_ALL,
    payload: bookings
});

const addOne = (bookingData) => ({
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
export const getBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const bookings = await response.json();
        // console.log("JSONIFIED bookings DATA AFTER THUNK:", bookings);
        dispatch(loadAll(bookings));
        return bookings;
    }
}

export const getUserBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`);

    if (response.ok) {
        const userBookings = await response.json();
        // console.log("JSONIFIED bookings DATA AFTER THUNK:", userBookings);
        dispatch(loadAll(userBookings));
        return userBookings;
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
        dispatch(addOne(newBooking));
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
        case LOAD_ALL:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            // console.log("LOAD_ALL ACTION.PAYLOAD IS:", action.payload);
            const newAllbookings = {};
            action.payload.Bookings.forEach(booking => newAllbookings[booking.id] = booking);
            newState.user = newAllbookings;
            // console.log("NEWSTATE AFTER LOAD_ALL ACTION:", newState);
            return newState;
        case ADD_BOOKING:
            newState = { ...state };
            const newBooking = { ...action.payload };
            newState.allbookings[action.payload.id] = newBooking;
            // console.log("NEWSTATE AFTER ADD_BOOKING ACTION:", newState);
            return newState;
        // case EDIT_BOOKING:
        //     newState = { ...state };
        //     const updatedBooking = { ...action.payload };
        //     newState.allbookings[action.payload.id] = updatedBooking;
        //     // console.log("NEWSTATE AFTER ADD_BOOKING ACTION:", newState);
        //     return newState;
        case REMOVE_BOOKING:
            newState = { ...state, allbookings: { ...state.allbookings } };
            delete newState.allbookings[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER REMOVE_BOOKING ACTION:", newState);
            return newState;
        default:
            return state;
    }
};

export default bookingsReducer;
