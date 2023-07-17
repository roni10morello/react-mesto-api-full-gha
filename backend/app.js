const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login, logOut } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./middlewares/validate');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');

//console.log(process.env.NODE_ENV); // production

// const { PORT = 3000 } = process.env;
const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
const { PORT = 4000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.log(`Connection is fail ${err}`);
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('{Хьюстон, у нас проблема!}');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.delete('/signout', logOut);
app.use('/', auth, routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
