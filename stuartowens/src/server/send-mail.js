const nodemailer = require('nodemailer');
const { escape } = require('sanitizer');
const { mail: { host, port, auth } } = require('../../config.js');

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: true,
  auth: {
    user: auth.username,
    password: uth.password
  }
});

module.exports = (name, email, message ) => {
  
}
