import React from 'react';
import { Link } from 'react-router-dom'
import RatingSystem from '../RatingSystem';

const PostList = ({ posts, title }) => {
    if (!posts.length) {
        return <h3>No discussions started yet.</h3>;
    }

    return (
        <div id='list-display'>
            <h3>{title}</h3>
                {posts &&
                    posts.map(post => (
                        <div key={post._id} className='card-mb-3'>
                            <p className='card-header'>
                                <Link
                                    to={`/profile/${post.username}`}
                                >
                                    {post.username}
                                </Link>{' '}
                                    posted on {post.createdAt}
                            </p>

                            <div className='card-body'>
                                <Link to={`/post/${post._id}`}>
                                    <p id='gameTitle'>{post.gameTitle}</p>
                                    <p>
                                        <span>
                                            {[1,2,3,4,5].map((value) => (
                                                <RatingSystem
                                                    key={post.gameRating}
                                                    filled={value <=post.gameRating}
                                                />
                                            ))}
                                        </span>
                                    </p>
                                    <p className='card-comments'>
                                        Comments: {post.commentCount} -- Click to{' '}
                                        {post.commentCount ? 'view' : 'add'} comments on this post!
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))
                }    
        </div>
    );
};

export default PostList;