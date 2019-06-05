const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    error: null
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            sessionStorage.clear();
            return Object.assign({}, state, {error: null, followers: action.payload});
        default:
            return state;
    }
};

export default profile;