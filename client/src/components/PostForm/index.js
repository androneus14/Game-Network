import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import RatingSystem from '../RatingSystem';

const PostForm = () => {
    const [gameTitle, setGameTitle] = useState('');
    const [gameRating, setGameRating] = useState(0);
    const [gameReview, setGameReviewText] = useState('');

    const [characterCount, setCharacterCount] = useState(0);
    const [gameReviewCharacterCount, setGameReviewCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addGamePost } }) {
          try {
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } },
            });
          } catch (e) {
            console.error(e);
          }
          
          const { posts } = cache.readQuery({ query: QUERY_POSTS });
          cache.writeQuery({
            query: QUERY_POSTS,
            data: { posts: [addPost, ...posts] },
          });
        },
      });

    // When a user types in the title of their discussion post / game title
    const handleChange = (event) => {
        if (event.target.value.length <= 50) {
            setGameTitle(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { gameTitle, gameRating, gameReview },
            });

            setGameTitle('');
            setCharacterCount(0);
            setGameReviewText('');
            setGameReviewCharacterCount(0);
        } catch (err) {
            console.error(err)
        }
    };

    // When a user types in a review for a game
    const handleGameReviewChange = (event) => {
         if (event.target.value.length <= 280) {
            setGameReviewText(event.target.value);
            setGameReviewCharacterCount(event.target.value.length);
         }
    };

    // When a type rates the game they are talking about
    const handleGameRatingChange = (newRating) => {
        setGameRating(newRating);
    };

    return (
        <div>
            <h3>What game are you playing and what do you think of it?</h3>

            <form
                className='flex-row justify-center justify-space-between-md align-center'
                onSubmit={handleFormSubmit}
            >
                <p
                    className={`m-0 ${
                        characterCount === 100 ? 'text-danger' : ''
                    }`}
                >
                    Character Count: {characterCount}/100
                </p>

                <textarea
                    name='gameTitle'
                    placeholder='What game are you playing?'
                    value={gameTitle}
                    className='form-input'
                    id='input-gameTitle'
                    onChange={handleChange}
                ></textarea>

                <p
                    className={`m-0 ${
                        gameReviewCharacterCount === 280 ? 'text-danger' : ''
                    }`}
                >
                    Character Count: {gameReviewCharacterCount}/280
                </p>

                <textarea
                    name='gameReview'
                    placeholder='What do you think of this game?'
                    value={gameReview}
                    className='form-input'
                    id='input-gameReview'
                    onChange={handleGameReviewChange}
                ></textarea>

                <span className='ratingSystem' id='ratingSystem'>Rating:</span>
                <span className='ratingFire' id='ratingFire'>
                    {[1,2,3,4,5].map((value) => (
                        <RatingSystem
                            key={value}
                            filled={value <= gameRating}
                            onClick={() => handleGameRatingChange(value)}
                        />
                    ))}
                </span>

                <button
                    id='submit-btn'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostForm;