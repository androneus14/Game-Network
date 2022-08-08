const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
         // Query to get data about all users and their posts and friends using find()
        users: async () => {
            return User.find().populate('posts').populate('friends');
        },

        // Query to get data about a single user using their username and findOne()
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('posts').populate('friends');
        },

        // Query to get all posts on the main page and display the usernames of the people that created them
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },

        // Query to get a single post through its individual ID and findOne()
        post: async (parent, { _id }) => {
            return Post.findOne({ _id });
        },

        // Query to get data about me
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .populate('posts').populate('friends');

                return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
          // Mutation to add a new user with username, email and password
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
    
        // Login mutation with email and password
        login: async (parent, { email, password }) => {
            // Check to see if the email address is registered with findOne({email})
            const user = await User.findOne({ email });
            // Error message when the email isn't found in the local storage
            if (!user) {
                throw new AuthenticationError('No user found with this email address!');
            }
            // Check to see if the password is correct 
            const correctPw = await user.isCorrectPassword(password);
            // Error message when the password doesn't match the email address
            if (!correctPw) {
                throw new AuthenticationError('Incorrect email or password');
            }

            const token = signToken(user);

            return { token, user };
        },

        // Create a new post mutation and add it to the user
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create(
                    { 
                    // Create the text body of the post and add the username of the user that created it
                        ...args,
                        username: context.user.username 
                    }
                );
                
                // Find the user and update their profile by adding the postId to their profile
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                return post;
            }
            // Error message when the user isn't logged in so they can't create a post
            throw new AuthenticationError('You need to be logged in to create a post!');
        },

         // Comment on a post mutatation and add it to the post via its postId
        addComment: async (parent, { postId, commentText }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                     // Find the postId and update
                    { _id: postId },
                    // add the comment to the above postId with the text body of the comment and the user that created it
                    { $push: { comments: { commentText, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            }
            // Error message when the user isn't logged in so they can't comment on the post
            throw new AuthenticationError('You need to be logged in to comment on this post!');
        },

        // Add a friend mutation through findOneAndUpdate()
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    // Getting the user's ID
                    { _id: context.user._id },
                    // Adding the friend to the above user via their friendId 
                    { $addToSet: { friends: friendId } },
                    { new: true }
                // Populating the current user with their new friend
                ).populate('friends');

                return updatedUser;
            }
            // Error message when the user isn't logged in so they are unable to add the other user as a friend
            throw new AuthenticationError('You need to be logged in to add this friend!');
        }
    }
};

// removePost
// removeComment
// removeFriend mutations if time permits

module.exports = resolvers;