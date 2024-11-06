// src/reducers/index.js
import { combineReducers } from 'redux';
import auth from "./auth";
import profile from "./profile";
import post from "./post";

// import your individual reducers here
// import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth,
    profile,
    post
    // your reducers here
    // auth: authReducer,
});

export default rootReducer;
