import { csrfFetch } from './csrf';
/* ----------------------------- ACTION TYPES: ----------------------------- */
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


/* ---------------------------- ACTION CREATORS: ---------------------------- */
const setUser = (userData) => {
    console.log("PAYLOAD SENT TO REDUCER WITH SET USER ACTION CREATOR:", userData);
    return {
        type: SET_USER,
        payload: userData,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


/* ------------------------- THUNK ACTION CREATORS: ------------------------- */
export const login = (userInfo) => async (dispatch) => {
    const { credential, password } = userInfo;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const user = await response.json();
    console.log("DATA THAT COMES BACK FROM LOGIN THUNK:", user);
    dispatch(setUser(user));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    console.log("DATA COMING BACK FROM RESTORE USER THUNK:", data);
    dispatch(setUser(data.user));
    return response;
};

export const signup = (userInfo) => async (dispatch) => {
    const { firstName, lastName, username, email, password } = userInfo;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const newUser = await response.json();
    console.log("DATA THAT COMES BACK FROM SIGN UP THUNK:", newUser);
    dispatch(setUser(newUser));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};


/* -------------------------------- REDUCER: -------------------------------- */
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = { ...state }
            newState.user = action.payload;
            console.log("NEWSTATE AFTER SET_USER ACTION", newState);
            return newState;
        case REMOVE_USER:
            newState = { ...state };
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
