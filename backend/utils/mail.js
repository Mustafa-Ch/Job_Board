const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS_MAIL_PASS,
  },
});

const sendMail = async (email, subject, text) => {
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    text,
  };
  await transport.sendMail(options);
};
const forgotMail = async (email, html) => {
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Password Recovery Email",
    html,
  };
  await transport.sendMail(options);
};
const verifiedMail = async (email, html) => {
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Mail Verification",
    html,
  };
  await transport.sendMail(options);
};

module.exports = { sendMail, forgotMail, verifiedMail };
