var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var resourcesRouter = require('./routes/resources');
var eventsRouter = require('./routes/events');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//example of simple middleware
app.use(function myMiddleware(req, res, next) {
  console.log('Hello World!');
  next();
});
// example of limiting middleware with http path 
//.send send to the client (browser)
app.use('/hello', function hello(req, res, next) {
  res.send('world');
});

// middleware for tasks
app.use('/tasks', tasksRouter);
// middleware for events
app.use('/events', eventsRouter);
// middleware for resources
app.use('/resources', resourcesRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
