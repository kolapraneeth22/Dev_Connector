import axios from "axios";
import { toast } from "react-hot-toast";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
    // Check if there is a token in localStorage
    if (localStorage.token) {
        setAuthToken(localStorage.token); // Set token in request headers
    }

    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: "USER_LOADED",
            payload: res.data
        });
    } catch (err) {
        // Handle token expiration or invalid token
        dispatch({
            type: "AUTH_ERROR"
        });
        toast.error("Authentication Error", { id: "auth-error" });
        // Optionally log the user out here if token is invalid
        dispatch(logout());
    }
};


// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        });
        toast.success("Registration Successful", { id: "register-success" });
        dispatch(loadUser()); // Call loadUser here to fetch user info
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error, index) =>
                toast.error(error.msg, { id: `register-error-${index}` })
            );
        }
        dispatch({
            type: "REGISTER_FAIL"
        });
        toast.error("Registration Failed", { id: "register-fail" });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });
        toast.success("Login Successful", { id: "login-success" });

        dispatch(loadUser()); // Call loadUser here to fetch user info
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error, index) =>
                toast.error(error.msg, { id: `login-error-${index}` })
            );
        }
        dispatch({
            type: "LOGIN_FAIL"
        });
        toast.error("Login Failed", { id: "login-fail" });
    }
};

// Logout
export const logout = () => dispatch => {
    dispatch({ type: "CLEAR_PROFILE" });
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Successful", { id: "logout-success" });
};
