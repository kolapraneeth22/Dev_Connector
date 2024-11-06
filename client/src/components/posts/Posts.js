import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Spinner from '../layout/Spinner';
import { getPosts, deletePost } from '../../actions/post';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import { addLike, removeLike } from '../../actions/post';

const Posts = ({ addLike, removeLike, getPosts, deletePost, post: { posts, loading }, showActions, auth }) => {
  const location = useLocation(); // Get current location

  // Only render the PostForm if we are not on the post detail page
  const isOnPostDetailPage = location.pathname.includes('/post/');

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? <Spinner /> : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>

      {/* Conditionally render PostForm based on the current location */}
      {!isOnPostDetailPage && <PostForm />}

      <div className="posts">
        {posts.map(post => (
          <div className="post bg-white p-1 my-1" key={post._id}>
            <div>
              <Link to={`/profile/${post.user}`}>
                <img
                  className="round-img"
                  src={post.avatar}
                  alt=""
                />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
              <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
              </p>
              {showActions && (
                <Fragment>
                  <button onClick={e => addLike(post._id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i>
                    <span>{post.likes.length > 0 && <span> {post.likes.length}</span>}</span>
                  </button>
                  <button onClick={e => removeLike(post._id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-primary">
                    Discussion
                    {post.comments.length > 0 && (
                      <span className="comment-count">{post.comments.length}</span>
                    )}
                  </Link>
                  {!loading && auth.user && auth.user._id === post.user && (
                    <button onClick={() => deletePost(post._id)} type="button" className="btn btn-danger">
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

Posts.defaultProps = {
  showActions: true
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts, deletePost, addLike, removeLike })(Posts);
