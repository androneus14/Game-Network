import { gql } from '@apollo/client';


export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($gameTitle: String!, $gameRating: Int, $gameReview: String) {
        addPost(gameTitle: $gameTitle, gameRating: $gameRating, gameReview: $gameReview) {
            _id
            gameTitle
            gameRating
            gameReview
            createdAt
            username
            commentCount
            comments {
                _id
            }            
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $commentText: String!) {
        addComment(postId: $postId, commentText: $commentText) {
            _id
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

export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
            _id
            username
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;