import { put, call, takeLatest } from 'redux-saga/effects'
import { getUserFollowers } from './../services/api';
import { getUserFollowersError, getUserFollowersSuccess } from './../actions/Profile';


function* getUserFollowersRequest(details) {
    try {
        const response = yield call(getUserFollowers, details.data);
        yield put(getUserFollowersSuccess(response));
    } catch (e) {
        yield put(getUserFollowersError(e.message));
    }
}


export default function * rootSaga() {
    yield takeLatest("GET_USER_FOLLOWERS", getUserFollowersRequest);
}