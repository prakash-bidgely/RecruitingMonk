var mongoose = require ( "mongoose" );
var shortid = require ( "shortid" );
const Schema = require ( "mongoose" );

var contentSchema = new mongoose.Schema ( {
    uid: {
        type: String,
        required: true,
        default: shortid.generate
    },
    uploaded_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    video: {
        type: String,
        unique: true,
        sparse: true
    },
    pdf: {
        type: String,
        sparse: true
    },
    category: {
        type: String
    },
    sub_category: {
        type: String
    },
    title: {
        type: String,
        unique: true,
        sparse: true
    },
    content: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    time: {type: Date, default: Date.now ()}

} );

module.exports = mongoose.model ( "Content", contentSchema );
