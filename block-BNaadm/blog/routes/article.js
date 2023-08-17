var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Comment = require('../models/comment');

router.get('/new', (req, res) => {
    res.render("addArticle.ejs");
});

// CREATE
router.post('/', (req, res, next) => {

    // save it to database
    Article.create(req.body) // save the data in database of Book
    .catch((err) => next(err)) 
    .then(() => res.redirect('/article')) //  res.redirect alwayes do GET request on  /article
})

router.get('/', (req, res) => {
    // fetch list of books from database

    Article.find({})
       .catch((err) => next(err))
       .then((articles) => res.render('articles.ejs', {articles: articles}))
});

// get artical details page with POPULATION
router.get('/:id', (req, res, next) => {
    console.log('hi')
    var id = req.params.id;  // to capture the id

    Article.findById(id)
    .catch((err) => next(err))
    .then((article) => {
        console.log(article)
        res.render('articleDetails', {article: article});
    })

})

module.exports = router;



















/*

router.get('/new', (req, res) => {
    res.render("addBook.ejs");
});


//
// READ (get book details page)  only Book is used
router.get('/:id', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Book.findById(id)
        .catch((err) => next(err))
        .then((bookDet) => {
            console.log(bookDet);
            res.render('bookDetails', {book: bookDet}); // book is key use in bookDetails.ejs page
        })
})
//

//
// get book details page    Book and Comment both are used
router.get('/:id', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Book.findById(id)
        .catch((err) => next(err))
        .then((bookDet) => {
            Comment.find({ bookId: id})
            .catch((err) => next(err))
            .then((allComments) => {
                res.render('bookDetails', {book: bookDet, comments: allComments}); // book and comments is key use in bookDetails.ejs page
                // book is object contain details of single book, comments is array of all comment
            })
        })
})
//



// get book details page with POPULATION
router.get('/:id', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Book.findById(id).populate('comments').exec()
    .catch((err) => next(err))
    .then((book) => {
        console.log(book)
        res.render('bookDetails', {book: book});
    })

})

// UPDATE
router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Book.findById(id)
        .catch((err) => next(err))
        .then((bookDet) => {
            res.render('editBookForm', {book: bookDet}); // book is key use in editBookForm.ejs page
        })
})

router.post('/:id', (req, res, next) => {

    //capture the updated data from form
    var id = req.params.id;  // to capture the id

    // using id find the book and update it with data coming from the form
    Book.findByIdAndUpdate(id, req.body)
        .catch((err) => next(err))
        .then(() => {
            res.redirect("/books/" + id)
        })
})

//
// DELETE
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Book.findByIdAndDelete(id)
        .catch((err) => next(err))
        .then((book) => {
            res.redirect("/books/")
        })
})
//

// replace DELETE by this
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    Book.findByIdAndDelete(id)
        .catch((err) => next(err))
        .then((book) => {
            Comment.deleteMany({bookId: book._id})
            .catch((err) => next(err))
            .then((info) => {
                res.redirect("/books/")
            })
        })
})

// add comment
router.post('/:id/comments', (req, res, next) => {
    var id = req.params.id;  // to capture the id

    req.body.bookId = id;   // add bookId key with value of req.params.id; 
    Comment.create(req.body) // save the data in database of Comment
    .catch((err) => next(err)) 
    .then((comment) => {
        // update book with comment id into comment section
        Book.findByIdAndUpdate(id,  {$push: {comments: comment._id}} )  // _id of comment is push in comment section of Book
        .catch((err) => next(err))
        .then(() => {
            res.redirect("/books/" + id)
        })
    }) 
})


module.exports = router;

*/