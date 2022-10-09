import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const LOAD_USER_REVIEWS = '/REVIEWS/LOAD_USER_REVIEWS';
const LOAD_SPOT_REVIEWS = '/REVIEWS/LOAD_SPOT_REVIEWS';
const ADD_REVIEW = '/REVIEWS/ADD_REVIEW';
const ADD_REVIEW_IMG = '/REVIEWS/ADD_REVIEW_IMG';
const EDIT_REVIEW = '/REVIEWS/EDIT_REVIEW';
const REMOVE_REVIEW = '/REVIEWS/REMOVE_REVIEW';
const CLEAR_DATA = '/spots/CLEAR_DATA';


/* ---------------------------- ACTION CREATORS: ---------------------------- */
const loadUserReviews = (reviews) => ({
    type: LOAD_USER_REVIEWS,
    payload: reviews
});

const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    payload: reviews
});

const add = (reviewData, userData, spotData) => ({
    type: ADD_REVIEW,
    payload: {
        reviewData,
        userData,
        spotData
    }
});

const addReviewImg = (reviewId, reviewImgData) => ({
    type: ADD_REVIEW_IMG,
    payload: {
        reviewId,
        reviewImgData
    }
});

const editReview = (reviewData, userData, spotData) => ({
    type: EDIT_REVIEW,
    payload: {
        reviewData,
        userData,
        spotData
    }
})

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    payload: reviewId
});

export const clearData = () => ({
    type: CLEAR_DATA
});



/* ------------------------- THUNK ACTION CREATORS: ------------------------- */
export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`);

    if (response.ok) {
        const userReviews = await response.json();
        // console.log("JSONIFIED Reviews DATA AFTER THUNK:", userReviews);
        dispatch(loadUserReviews(userReviews));
        return userReviews;
    }
}

export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const spotReviews = await response.json();
        // console.log("JSONIFIED SPOT REVIEWS DATA AFTER THUNK:", spotReviews);
        dispatch(loadSpotReviews(spotReviews));
        return spotReviews;
    }
}

export const createReview = (spotId, reviewData, userData, spotData) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const newReview = await response.json();
        // console.log("JSONIFIED NEW-SPOT DATA AFTER THUNK:", newReview);
        dispatch(add(newReview, userData, spotData));
        return newReview;
    }
}

export const createReviewImg = (reviewId, reviewImgData) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewImgData)
    });

    if (response.ok) {
        const newReviewImg = await response.json();
        console.log("JSONIFIED NEW-SPOT DATA AFTER THUNK:", newReviewImg);
        dispatch(addReviewImg(reviewId, newReviewImg));
        return newReviewImg;
    }
}

export const updateReview = (reviewId, reviewData, userData, spotData) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const updatedReviewData = await response.json();
        // console.log("JSONIFIED UPDATED SPOT DATA AFTER THUNK:", updatedReviewData);
        dispatch(editReview(updatedReviewData, userData, spotData));
        return updatedReviewData;
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/ReviewS/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const successMessage = await response.json();
        // console.log("THIS IS THUNK SUCCESS MSG:", successMessage, ReviewId);
        dispatch(removeReview(reviewId));
        return successMessage;
    }
}


/* -------------------------------- REDUCER: -------------------------------- */
const initialState = { user: null, spot: null };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_REVIEWS:
            newState = { ...state, user: { ...state.user } };
            // console.log("LOAD_USER_REVIEWS ACTION.PAYLOAD IS:", action.payload);
            const newUserReviews = {};
            action.payload.Reviews.forEach(review => newUserReviews[review.id] = review);
            newState.user = newUserReviews;
            // console.log("NEWSTATE AFTER LOAD_USER_REVIEWS ACTION:", newState);
            return newState;
        case LOAD_SPOT_REVIEWS:
            newState = { ...state, spot: { ...state.spot } };
            // console.log("LOAD_SPOT_REVIEWS ACTION.PAYLOAD IS:", action.payload);
            const newSpotReviews = {};
            action.payload.Reviews.forEach(review => newSpotReviews[review.id] = review);
            newState.spot = newSpotReviews;
            // console.log("NEWSTATE AFTER LOAD_SPOT_REVIEWS ACTION:", newState);
            return newState;
        case ADD_REVIEW:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            const newUserReview = { ...action.payload.reviewData, User: { ...action.payload.userData }, Spot: { ...action.payload.spotData } };
            const newSpotReview = { ...action.payload.reviewData, User: { ...action.payload.userData } };
            newState.user[action.payload.reviewData.id] = newUserReview;
            newState.spot[action.payload.reviewData.id] = newSpotReview;
            // console.log("NEWSTATE AFTER ADD_REVIEW ACTION:", newState);
            return newState;
        case ADD_REVIEW_IMG:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            newState.user[action.payload.reviewId].ReviewImages ? newState.user[action.payload.reviewId].ReviewImages = [ ...state.user[action.payload.reviewId].ReviewImages ] : newState.user[action.payload.reviewId].ReviewImages = []
            newState.spot[action.payload.reviewId].ReviewImages ? newState.spot[action.payload.reviewId].ReviewImages = [ ...state.spot[action.payload.reviewId].ReviewImages ] : newState.spot[action.payload.reviewId].ReviewImages = []

            const newReviewImg = { ...action.payload.reviewImgData };

            newState.user[action.payload.reviewId].ReviewImages.push(newReviewImg);
            newState.spot[action.payload.reviewId].ReviewImages.push(newReviewImg);
            // console.log("NEWSTATE AFTER ADD_REVIEW_IMG ACTION:", newState);
            return newState;
        case EDIT_REVIEW:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            const updatedUserReview = { ...action.payload.reviewData, User: { ...action.payload.userData }, Spot: { ...action.payload.spotData } };
            const updatedSpotReview = { ...action.payload.reviewData, User: { ...action.payload.userData } };
            newState.user[action.payload.reviewData.id] = updatedUserReview;
            newState.spot[action.payload.reviewData.id] = updatedSpotReview;
            // console.log("NEWSTATE AFTER EDIT_REVIEW ACTION:", newState);
            return newState;
        case REMOVE_REVIEW:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            delete newState.user[action.payload];
            delete newState.spot[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER REMOVE_REVIEW ACTION:", newState);
            return newState;
        case CLEAR_DATA:
                return initialState;
        default:
            return state;
    }
};

export default reviewsReducer;
