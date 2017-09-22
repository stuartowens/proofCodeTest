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
  name = escape(name);
  email = escape(email);
  message = escape(message);

return new Promise((fulfill, reject) => {
  transporter.sendMail(
    {
      from: `"${name}" <${email}>`
      to: 'stuart@stuartowens.com',
      subject: `${name} Message from stuartowens.com`,
      html:
      `<h2>You have recieved a message from ${name} at ${email}</h2>
      <p>${message}</p>
      `
    },
    (err, info) => {
      if(err) { return reject(err); }
      fulfill(info);
    }
  );
})
}
