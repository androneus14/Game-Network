const { gql } = require ('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        friendCount: Int
        posts: [Post]
        friends: [User]
    }

    type Post {
        _id: ID
        gameTitle: String
        gameRating: Int
        gameReview: String
        createdAt: String
        username: String
        commentCount: Int
        comments: [Comment]
    }

    type Comment {
         _id: ID
         commentText: String
         username: String
         createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(postId: ID!): Post
        me: User
    }

    type Mutation {
        addUser(
            username: String!,
            email: String!,
            password: String!
        ): Auth
        login(
            email: String!,
            password: String!
        ): Auth
        addFriend(
            friendId: ID!
        ): User
        addPost(
            gameTitle: String!,
            gameRating: Int,
            gameReview: String
        ): Post
        addComment(
            postId: ID!,
            commentText: String!
        ): Post
    }
`;

module.exports = typeDefs;