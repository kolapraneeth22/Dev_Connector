//import toast from 'react-hot-toast';

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", payload.token);  // Store token
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case "REGISTER_FAIL":
        case "LOGIN_FAIL":
        case "AUTH_ERROR":
            localStorage.removeItem("token");  // Only remove token when there's an error
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        case "LOGOUT":
            localStorage.removeItem("token");  // Logout action
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
}


export default authReducer;
