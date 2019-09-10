var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var bioRouter = require('./routes/bio');
var contactRouter = require('./routes/contact');

var bodyParser = require('body-parser');
var fs = require('fs');

var path = require('path');
var app = express();

console.log('------ start -------');

var files = fs.readdirSync('public/daily-photos/');
var arrOfObjects = [];
files.map(function(value, index) {
  console.log(value);
  if (value.charAt(0) === '.') {} 
  else {
    arrOfObjects.push({
      title: value,
      url:  'http://localhost:3000/daily-photos/' + value
    });
  }
});

let arrStr = JSON.stringify(arrOfObjects);
let photoObj = `{"name": "My Daily Photos", "array": ${arrStr}}`;
let jsonResult = JSON.parse(photoObj);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


app.get('/', (req, res) => {
  return res.send(JSON.stringify(jsonResult));
});

app.get('/messages', (req, res)=> {
  console.log(' you have reached GET [messges] ');
  res.render('messages');
});


app.post('/messages', (req, res)=> {
  console.log('you have reached POST [messges] ');

  res.locals.data = req.body;
  res.render('messages');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/gallery', indexRouter);
app.use('/bio', bioRouter);
app.use('/contact', contactRouter);

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
