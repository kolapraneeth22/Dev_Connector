import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: {
    user: { name, avatar },
    status,
    company,
    location,
    website,
    social,
    bio,
    skills,
    experience,
    education
} }) => {
  return (
    <Fragment>
      <div className='profile-top bg-primary p-2'>
                        <img
                            className='round-img my-1'
                            src={avatar}
                            alt=''
                        />
                        <h1 className='large'>{name}</h1>
                        <p className='lead'>{status} {company && <span> at {company}</span>}</p>
                        <p>{location && <span>{location}</span>}</p>
                        <div className='icons my-1'>
                            {website && (
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    <i className='fas fa-globe fa-2x'></i>
                                </a>
                            )}
                            {social && social.twitter && (
                                <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-twitter fa-2x'></i>
                                </a>
                            )}
                            {social && social.facebook && (
                                <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-facebook fa-2x'></i>
                                </a>
                            )}
                            {social && social.linkedin && (
                                <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-linkedin fa-2x'></i>
                                </a>
                            )}
                            {social && social.youtube && (
                                <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-youtube fa-2x'></i>
                                </a>
                            )}
                            {social && social.instagram && (
                                <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-instagram fa-2x'></i>
                                </a>
                            )}
                        </div>
                    </div>
                    <div className='profile-about bg-light p-2'>
                        {bio && (
                            <Fragment>
                                <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
                                <p>{bio}</p>
                                <div className='line'></div>
                            </Fragment>
                        )}
                        <h2 className='text-primary'>Skill Set</h2>
                        <div className='skills'>
                            {skills.map((skill, index) => (
                                <div key={index} className='p-1'>
                                    <i className='fas fa-check'></i> {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='profile-exp bg-white p-2'>
                        <h2 className='text-primary'>Experience</h2>
                        {experience.length > 0 ? (
                            <Fragment>
                                {experience.map((experience) => (
                                    <div key={experience._id}>
                                        <h3 className='text-dark'>{experience.company}</h3>
                                        <p>{experience.from} - {experience.to ? experience.to : 'Now'}</p>
                                        <p><strong>Position: </strong>{experience.title}</p>
                                        <p>
                                            <strong>Description: </strong>{experience.description}
                                        </p>
                                    </div>
                                ))}
                            </Fragment>
                        ) : (
                            <h4>No experience credentials</h4>
                        )}
                    </div>
                    <div className='profile-edu bg-white p-2'>
                        <h2 className='text-primary'>Education</h2>
                        {education.length > 0 ? (
                            <Fragment>
                                {education.map((education) => (
                                    <div key={education._id}>
                                        <h3 className='text-dark'>{education.school}</h3>
                                        <p>{education.from} - {education.to ? education.to : 'Now'}</p>
                                        <p><strong>Degree: </strong>{education.degree}</p>
                                        <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>
                                        <p>
                                            <strong>Description: </strong>{education.description}
                                        </p>
                                    </div>
                                ))}
                            </Fragment>
                        ) : (
                            <h4>No education credentials</h4>
                        )}
                    </div>
    </Fragment>
  )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop