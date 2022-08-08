import { gql } from '@apollo/client';

// As the current user, I can see all information about my own account.
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            password
            friendCount
            posts {
                _id
                gameTitle
                gameRating
                gameReview
                createdAt
                username
                commentCount
                comments {
                    _id
                    commentText
                    createdAt
                    username
                }
            }
            friends {
                _id
                username
            }
        }
    }
`;

// When looking at another user, we can see most information about them, 
// minus a few items such as what other posts they are commenting on.
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            friendCount
            posts {
                _id
                gameTitle
                gameRating
                gameReview
                createdAt
                commentCount
            }
            friends {
                _id
                username
            }
        }
    }
`;

// When I view all posts I get all of the posts info, including the comments under the post
export const QUERY_POSTS = gql`
    query posts($username: String) {
        posts(username: $username) {
            _id
            gameTitle
            gameRating
            gameReview
            createdAt
            username
            commentCount
            comments {
                _id
                commentText
                createdAt
                username
            }
        }
    }
`;

//When I view a single post, I get all the posts information, including the comments under the post
export const QUERY_SINGLE_POST = gql`
    query getSinglePost($postId: ID!) {
        post(postId: $postId) {
            _id
            gameTitle
            gameRating
            gameReview
            createdAt
            username
            commentCount
            comments {
                _id
                commentText
                createdAt
                username
            }
        }
    }
`;