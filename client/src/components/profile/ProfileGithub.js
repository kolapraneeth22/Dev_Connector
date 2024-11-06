import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ getGithubRepos, username, repos }) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username]); // Added `username` dependency

    return (
        <Fragment>
            <div className='profile-github'>
                <h2 className='text-primary my-1'>
                    <i className='fab fa-github'></i> Github Repos
                </h2>
                {repos === null || !Array.isArray(repos) ? ( // Check if repos is null or not an array
                    <Spinner />
                ) : (
                    repos.map(repo => (
                        <div key={repo.id} className='repo bg-white p-1 my-1'>
                            <div>
                                <h4>
                                    <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                                        {repo.name}
                                    </a>
                                </h4>
                                <p>{repo.description}</p>
                            </div>
                            <div>
                                <ul>
                                    <li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
                                    <li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
                                    <li className='badge badge-light'>Forks: {repo.forks_count}</li>
                                </ul>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Fragment>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired, // Corrected prop type to func
    username: PropTypes.string.isRequired,
    repos: PropTypes.array
};

const mapStateToProps = (state) => ({
    repos: state.profile.repos || [] // Ensure repos defaults to an empty array
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
