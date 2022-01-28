if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/** STUB ANOTHER PACKAGE */
var cors = require('cors');
var session = require('express-session');
/** STUB REDIS PACKAGE */
const RedisStore = require('connect-redis')(session);
var redis = require('redis');
/** STUB MONGOOSE SETUP */
const mongoose = require('mongoose');

/** Configuration Function */
const ConfigStore = require('./config/storageConf');
const CorsConfig = require('./config/corsConf');

/** STUB MONGOOSE RUN SETUP */
mongoose.connect(ConfigStore.mongodb.url, async (err) => {
  if (err) throw err
  console.log("Connected To Database No Sql")
})
/** STUB  END MONGOOSE RUN SETUP */

//============================ Redis Settings ===============================
const redisClient = redis.createClient(ConfigStore.redis.option);
redisClient.on('ready', () => {
  console.log('Successfully connected to Redis.')
});
ConfigStore.redis.client = redisClient;
//============================ End Redis Settings ===============================

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/** Session Setup */
app.use(session({
  store: new RedisStore({ client: ConfigStore.redis.client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie 
    maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
}))
/** Cors Setup */
app.use(cors(CorsConfig.option))



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
app.use('/image', express.static(path.join(__dirname, 'public/image_product')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
