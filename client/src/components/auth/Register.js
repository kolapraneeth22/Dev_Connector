import React, { Fragment, useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from "../../actions/auth";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({ register,isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match", { id: "password-mismatch" }); // Show error with toast
        } else {
            register({ name, email, password });
        }
    };
    //Navigate if Registered
    if(isAuthenticated){
        return <Navigate to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name}
                        onChange={onChange}
                        //required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email}
                        onChange={onChange} 
                        //required 
                    />
                    <small className="form-text">
                        This site uses Gravatar, so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={onChange}
                        //required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={onChange}
                        //required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(Register);