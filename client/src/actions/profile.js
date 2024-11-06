import axios from "axios";
import { toast } from 'react-hot-toast';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");
        dispatch({
            type: "GET_PROFILE",
            payload: res.data
        });
    } catch (err) {
        const status = err.response.status;
        const message = status === 401 ? "Unauthorized access" : "Unable to fetch profile data";

        if (status !== 400) {  // Display toast only if it's not a Bad Request
            toast.error(message, { id: "profile-error" });
        }

        dispatch({
            type: "PROFILE_ERROR",
            payload: { msg: err.response.statusText, status }
        });
    }
};
// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: "CLEAR_PROFILE" });
    try {
        const res = await axios.get("/api/profile");
        dispatch({
            type: "GET_PROFILES",
            payload: res.data
        });
    } catch (err) {
        const status = err.response.status;
        const message = status === 401 ? "Unauthorized access" : "Unable to fetch profiles";
        toast.error(message, { id: "profile-error" });
    };
};

// Get profile by ID
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: "GET_PROFILE",
            payload: res.data
        });
    } catch (err) {
        const status = err.response.status;
        const message = status === 401 ? "Unauthorized access" : "Unable to fetch profile data";
        if (status !== 400) {  // Display toast only if it's not a Bad Request
            toast.error(message, { id: "profile-error" });
        }
        dispatch({
            type: "PROFILE_ERROR",
            payload: { msg: err.response.statusText, status }
        });
    }
};

// Get Github repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: "GET_REPOS",
            payload: res.data
        });
    } catch (err) {
        const status = err.response.status;
        const message = status === 401 ? "Unauthorized access" : "Unable to fetch Github repositories";
        if (status !== 400) {  // Display toast only if it's not a Bad Request
            toast.error(message, { id: "profile-error" });
        }
        dispatch({
            type: "PROFILE_ERROR",
            payload: { msg: err.response.statusText, status }
        });
    }
};

// Create or update profile

export const createProfile = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/profile", formData, config);
        
        dispatch({
            type: "CREATE_PROFILE",
            payload: res.data
        });
        
        toast.success("Profile Created", { id: "profile-success" });
        navigate('/dashboard'); // Redirect to dashboard or a relevant page

    } catch (err) {
        const errors = err.response?.data?.errors || [];
        errors.forEach(error => toast.error(error.msg, { id: error.param }));
        dispatch({
            type: "PROFILE_ERROR",
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.put("/api/profile/experience", formData, config);
        
        dispatch({
            type: "UPDATE_PROFILE",
            payload: res.data
        });
        
        toast.success("Experience Added", { id: "profile-success" });
        navigate('/dashboard'); // Redirect to dashboard or a relevant page

    } catch (err) {
        const errors = err.response?.data?.errors || [];
        errors.forEach(error => toast.error(error.msg, { id: error.param }));

        const status = err.response ? err.response.status : 500; // Set default status code
        const statusText = err.response ? err.response.statusText : "Server error"; // Set default status text
        
        dispatch({
            type: "PROFILE_ERROR",
            payload: { msg: statusText, status }
        });
    }
};


//Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.put("/api/profile/education", formData, config);

        dispatch({
            type: "UPDATE_PROFILE",
            payload: res.data
        });

        toast.success("Education Added", { id: "profile-success" });
        navigate('/dashboard'); // Redirect to dashboard or a relevant page

    } catch (err) {
        // Check if err.response is defined and handle accordingly
        const errors = err.response?.data?.errors || [];
        errors.forEach(error => toast.error(error.msg, { id: error.param }));

        // Set default values for status and statusText if err.response is undefined
        const status = err.response ? err.response.status : 500; // Set default status code
        const statusText = err.response ? err.response.statusText : "Server error"; // Set default status text
        
        dispatch({
            type: "PROFILE_ERROR",
            payload: { msg: statusText, status }
        });
    }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
        try {
            const res = await axios.delete(`/api/profile/experience/${id}`);
            dispatch({
                type: "UPDATE_PROFILE",
                payload: res.data
            });
            toast.success("Experience Removed", { id: "profile-success" });
        } catch (err) {
            const status = err.response ? err.response.status : 500; // Set default status code
            const statusText = err.response ? err.response.statusText : "Server error"; // Set default status text
            dispatch({
                type: "PROFILE_ERROR",
                payload: { msg: statusText, status }
            });
        }
    };

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: "UPDATE_PROFILE",
            payload: res.data
        });
        toast.success("Education Removed", { id: "profile-success" });
    } catch (err) {
        const status = err.response ? err.response.status : 500; // Set default status code
        const statusText = err.response ? err.response.statusText : "Server error"; // Set default status text
        dispatch({
            type: "PROFILE_ERROR",
            payload: { msg: statusText, status }
        });
    }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if(window.confirm("Are you sure? This can NOT be undone!")) {
        try {
            await axios.delete("/api/profile");
            dispatch({ type: "CLEAR_PROFILE" });
            dispatch({ type: "ACCOUNT_DELETED" });
            toast.success("Your account has been permanently deleted");
        } catch (err) {
            const status = err.response ? err.response.status : 500; // Set default status code
            const statusText = err.response ? err.response.statusText : "Server error"; // Set default status text
            dispatch({
                type: "PROFILE_ERROR",
                payload: { msg: statusText, status }
            });
        }
    }
};

