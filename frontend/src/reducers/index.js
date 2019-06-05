import { combineReducers } from 'redux';
import login from "./Login";
import profile from "./Profile";
import header from "./Header";


const TwitterAppReducer = combineReducers({
    login: login,
    profile: profile,
    header: header
});

export default TwitterAppReducer;