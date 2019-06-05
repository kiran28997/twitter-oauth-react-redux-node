export const getUserFollowersError = (error) => ({
    type: 'GET_FOLLOWERS_ERROR',
    payload: error
});

export const getUserFollowersSuccess = (data) => ({
    type: 'GET_FOLLOWERS_SUCCESS',
    payload: data
});