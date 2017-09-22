const express = require ('express');
const bodyParser = require ('body-parser');
const morgan = require('morgan');
const path = require('path');
const sendmail =  require('./send-mail');
const {env} = require('../../config');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, '../client/public/')));

app.post('/contact', (req, res, next)=> {
  const { name, email, message } = req.body;
  sendmail(name, email, message)
    .then((info)=> res.sendStatus(201))
    .then((err)=> next(err));
})

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.use((err, req, res, next) => {
  var status = err.status || 500;
  var message = env === 'development' ? err.stack : err.message;
  res.status(status).send(message);
});

module.exports = app;
