import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {
    const [commentText, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormChange = (event) => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addComment({ variables: { commentText, postId }});

            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className='comment-form'>
            <h4>Do you agree with this user's opinion on the game? Let us know!</h4>

            {Auth.loggedIn() ? (
                <>
                    <p 
                        className={`m-0 ${
                            characterCount === 280 || error ? 'text-danger' : ''
                        }`}
                >
                    Character Count: {characterCount}/280
                    {error && <span className='m-0'>{error.message}</span>}
                    </p>
                    <form
                        className='flex-row justify-center justify-space-between-md align-center'
                        onSubmit={handleFormSubmit}
                    >
                        <div>
                            <textarea
                                name='commentText'
                                placeholder='Add your comment here...'
                                value={commentText}
                                className='form-input w-100'
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleFormChange}
                            ></textarea>
                        </div>
                        <div>
                            <button 
                                id='submit-btn'
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <p>
                     You need to be logged in to share your thoughts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default CommentForm;