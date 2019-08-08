var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var mongoose = require('mongoose');
var routes = require('./routes/routes');

var app = express();

// mongoose setup
mongoose.Promise = require('bluebird');
var dbHost = process.env.DB_HOST || 'localhost';
var dbName = process.env.DB_NAME;
var dbUser = process.env.DB_USERNAME;
var dbPass = process.env.DB_PASSWORD;
var dbPort = process.env.DB_PORT || "27017";
mongoose
  .connect("mongodb://" + dbUser + ":" + dbPass + "@" + dbHost + ":" + dbPort + "/" + dbName, { promiseLibrary: require("bluebird"), useNewUrlParser: true })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '250kb' }));
// app.use(bodyParser.urlencoded({limit: '500kb', extended: true}));
// app.use(bodyParser.urlencoded({'extended':'false'}));
if (process.env.REACT_APP_SERVER_ENVIORNMENT !== 'dev') {
  app.use(favicon(path.join(__dirname, 'build/favicon.ico')));
}
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());

app.get("/static/*.js", function (req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  res.set("Content-Type", "text/javascript");
  next();
});

app.get("/pdf/*", function (req, res) {
  res.sendFile(req.url);
});

app.get("/uploads/*", function (req, res) {
  if (req.url.indexOf('?') > 0) {
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }
  fs.readFile(`.${req.url}`, function (err, content) {
    if (err) {
      res.writeHead(400, { 'Content-type': 'text/html' })
      res.end("No such image");
    } else {
      res.writeHead(200, { 'Content-type': 'image/jpg' });
      res.end(content);
    }
  });
});

app.get("/getFonts/*", function (req, res) {
  if (req.url.indexOf('?') > 0) {
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }
  fs.readFile(`.${req.url}`, function (err, content) {
    if (err) {
      res.writeHead(400, { 'Content-type': 'text/html' })
      res.end("No such font");
    } else {
      res.writeHead(200, { 'Content-type': 'application/x-font-ttf' });
      res.end(content);
    }
  });
});

// app.get('/static/*.css', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
