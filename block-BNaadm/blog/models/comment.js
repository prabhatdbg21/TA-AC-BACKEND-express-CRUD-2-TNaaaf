var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: { type: String, required: true },  // any content must have some string value thats why required is true
    articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true },  // any articleId must have some article id thats why required is true
    likes: Number,
    author: String,
}, {timestamps: true}) // give us created and updated time

var Comment = mongoose.model('Comment' , commentSchema);  // models name must be singular and start with capital letter

module.exports = Comment;
