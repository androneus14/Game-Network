const { Schema, model } = require('mongoose');
// Require the dateformat util as we need it to date when the posts are made
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
    // Title of the game played
    gameTitle: {
        type: String,
        required: true,
        trim: true
    },

    // How good we think the above game is on a scale of 0-10
    gameRating: {
        type: Number,
        min: 0,
        max: 10,
    },

    // A worded review of what we think of the game
    gameReview: {
        type: String,
        minlength: 1,
        maxlength: 280
    },

    // When the discussion post is created
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },

    // The user that created the discussion post
    username: {
        type: String,
        required: true,
        trim: true
    },

    // post schema's subschema
    comments: [
        {
            // text comment to the post
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280
            },

            // Username of the user that made the comment
            username: {
                type: String,
                required: true
            },

            // When the comment was made on the post
            createdAt: {
                type: Date,
                default: Date.now,
                get: timestamp => dateFormat(timestamp)
            }
        }
    ]
});

// Count the comments that this post has attached to it
postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;