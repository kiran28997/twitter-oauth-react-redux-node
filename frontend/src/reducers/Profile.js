const initialState = {
    error: null,
    followers: []
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FOLLOWERS_SUCCESS':
            return Object.assign({}, state, {error: null, followers: action.payload});
        case 'GET_FOLLOWERS_ERROR':
            return Object.assign({}, state, {error: action.payload, followers: []});
        default:
            return state;
    }
};

export default profile;