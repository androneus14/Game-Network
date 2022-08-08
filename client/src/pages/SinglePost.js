import React from 'react';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_POST } from '../utils/queries'
import Auth from '../utils/auth';

import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SinglePost = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { postId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        // pass URL parameter
        variables: { postId: postId },
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='card mb-3'>
                    <div className='card-body'>
                        <p>{post.gameTitle}</p>
                    </div>
                    <div className='card-body'>
                        <blockquote
                            className='p-4'
                            style={{
                                fontSize: '1.5rem',
                                fontStyle: 'italic',
                                border: '2px #1a1a1a',
                                lineHeight: '1.5',
                            }}
                        >
                            {post.gameReview}
                        </blockquote>
                    </div>
            </div>
            <div>
                <CommentList comments={post.comments} />
            </div>
            <div>
                {Auth.loggedIn() && 
                <CommentForm postId={post._id} />}
            </div>
        </div>
    );
};

export default SinglePost;