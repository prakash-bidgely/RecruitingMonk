const mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;
var shortid = require("shortid");

const PostSchema = new Schema({
    uid: {
        type: String,
        default: shortid.generate
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    text: {
        type: String
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
        ],
    views: {
       type: Number,
       default: 0
    },
    isQuestion: {
        type: Boolean,
        default: false
    },
    comment_parent: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

PostSchema.plugin(deepPopulate);
module.exports = Post = mongoose.model('Post', PostSchema);