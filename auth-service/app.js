const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const JWT = require("jsonwebtoken");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(express.static("public"));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.get('/login', async (req, res, next) => {
  // I am assuming that you do all the login checks...
  // and then only issue the JWT
  // ..........

  const secret = fs.readFileSync('./certs/private.pem');
  const token = JWT.sign({}, secret, {
    algorithm: "RS256",
    expiresIn: "10min"
  });

  return res.send({
    token,
  })  
});

app.use('/api', require('./routes/api.route'));


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
