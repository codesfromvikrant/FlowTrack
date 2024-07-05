const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = class Email {
  constructor(email) {
    this.to = email;
    this.from = `Flowtrack Team <${process.env.EMAIL_FROM}>`;
  }

  transporter() {
    if (process.env.NODE_ENV === 'production') { return nodemailer.createTransport({}) }
    else {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      })
    }
  }

  async send(template, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: template
    };

    await this.transporter().sendMail(mailOptions);
  }
}

// const transporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   })
// }

// const sendEmail = async (email, subject, text) => {
//   const mailOptions = {
//     from: `Flowtrack Team <${process.env.EMAIL_FROM}>`,
//     to: email,
//     subject,
//     text,
//   };

//   console.log(mailOptions)

//   await transporter().sendMail(mailOptions);
// }

