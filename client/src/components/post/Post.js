import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostItem from "../posts/PostItem"; // Use PostItem to display the post
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading } }) => {
    const { id } = useParams(); // Retrieve the id from the URL

    useEffect(() => {
        if (id) {
            getPost(id); // Fetch the post based on the ID from the URL
        }
    }, [getPost, id]);

    return (
        <div>
            {loading || !post ? <Spinner /> : (
                <Fragment>
                    <Link to='/posts' className='btn'>
                        Back To Posts
                    </Link>
                    <PostItem post={post} showActions={false} /> {/* Pass the specific post */}
                    <CommentForm postId={post._id} />
                    <div className='comments'>
                        {post.comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} postId={post._id} />
                        ))}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
