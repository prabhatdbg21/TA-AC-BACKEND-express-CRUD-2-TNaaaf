var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/blog')
.then(() => console.log('Connected'))
.catch((error) => console.log(error))

// instantiate the app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// capture form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// setup static directory
app.use(express.static(path.join(__dirname, 'public')));

// routing middlewares
app.use('/', indexRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
