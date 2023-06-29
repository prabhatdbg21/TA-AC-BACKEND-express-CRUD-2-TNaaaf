var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    tag: [String],
    author: String,
    like: Number
}, {timestamps: true}) // give us created and updated time

var Article = mongoose.model('Article' , articleSchema);  // models name must be singular and start with capital letter

module.exports = Article;