var express = require('express');
var router = express.Router();
var Article = require('../models/article')

router.get('/new', (req, res) => {
    res.render("addArticle.ejs");
});

// CREATE
router.post('/', (req, res, next) => {

    // save it to database
    Article.create(req.body) // save the data in database
    .then(() => res.redirect('/article')) //  res.redirect alwayes do GET request on  /books  // console.log(Book)
    .catch((err) => next(err))  // console.log(err)   // return next(err) in video
    // response
})

router.get('/', (req, res) => {
    // fetch list of books from database

    Article.find({})
       .catch((err) => next(err))
       .then((articles) => res.render('articles', {articles: articles})) 
});

// READ
router.get('/:id', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Article.findById(id)
        .catch((err) => next(err))
        .then((articleDetail) => {
            res.render('articleDetails', {article: articleDetail}); 
        })
})

// UPDATE
router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Article.findById(id)
        .catch((err) => next(err))
        .then((articleDetail) => {
            res.render('editArticleForm', {article: articleDetail}); // book is key use in editBookForm.ejs page
        })
})

router.post('/:id', (req, res, next) => {

    //capture the updated data from form
    var id = req.params.id;  // to capture the id

    // using id find the book and update it with data coming from the form
    Article.findByIdAndUpdate(id, req.body)
        .catch((err) => next(err))
        .then(() => {
            res.redirect("/article/" + id)
        })
})

// DELETE
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Article.findByIdAndDelete(id)
        .catch((err) => next(err))
        .then(() => {
            res.redirect("/article/")
        })
})

module.exports = router;
































