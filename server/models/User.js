const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    // User's username
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // User's email address
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },

    // User's password attached to the email address
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    
    // Post discussions that the user has created
    posts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Post'
        }
    ],

    // Other user's that this user has 'friended', linking them to this account
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]  
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Counts the friend's that this user has added
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;