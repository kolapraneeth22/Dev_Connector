import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom'; 
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
    const { id } = useParams(); 

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id]);

    return (
        <Fragment>
            {loading || profile === null ? <Spinner /> : <Fragment>
                <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                    <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
                )}
                <div className='profile-grid my-1'>
                    <ProfileTop profile={profile} />
                </div>
                { profile.githubusername && (
                    <ProfileGithub username={profile.githubusername} />
                )}

                </Fragment>}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
