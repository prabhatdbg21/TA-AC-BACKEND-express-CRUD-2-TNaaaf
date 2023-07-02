var express = require('express');
var router = express.Router();
var Article = require('../models/article')

// list articles
router.get('/', (req, res) => {
    Article.find({})
       .catch((err) => next(err))
       .then((articles) => res.render('articles', {articles: articles})) 
});

// create article form
router.get('/new', (req, res) => {
    res.render("addArticle");
});

// CREATE article
router.post('/', (req, res, next) => {
    
    req.body.tag = req.body.tag.trim().split(" ");   // because tag is an [ ] object we give data though html simply give space between two data

    // save it to database
    Article.create(req.body) // save the data in database
    .then(() => res.redirect('/article')) //  res.redirect alwayes do GET request on  /article  
    .catch((err) => next(err))  // return next(err) in video
    // response
})


// READ ( fetch single article )
router.get('/:id', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Article.findById(id)
        .catch((err) => next(err))
        .then((articleDetail) => {
            res.render('articleDetails', {article: articleDetail}); 
        })
})

// edit article form
router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Article.findById(id)
        .catch((err) => next(err))
        .then((articleDetail) => {
            articleDetail.tag = articleDetail.tag.join(" ")  // to get out as ( node css js ) in input if we not use this we get output as ( node,css,js ) in input
            res.render('editArticleForm', {article: articleDetail}); // book is key use in editBookForm.ejs page
        })
})

// Update article
router.post('/:id', (req, res, next) => {
    req.body.tag = req.body.tag.trim().split(" ");   // because tag is an [ ] object we give data though html simply give space between two data

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

// increment likes
router.get('/:id/likes', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Article.findByIdAndUpdate(id, {$inc: {like: 1}})
    .catch((err) => next(err))
    .then(() => {
        res.redirect("/article/" + id)
    })
})

// decriment likes
router.get('/:id/dislikes', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Article.findByIdAndUpdate(id, {$inc: {like: -1}})
    .catch((err) => next(err))
    .then(() => {
        res.redirect("/article/" + id)
    })
})

module.exports = router;
