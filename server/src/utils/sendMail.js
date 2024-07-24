const nodemailer = require("nodemailer");
require("dotenv").config();
console.log("mail", process.env.EMAIL);
console.log("mail", process.env.PASSWORD);
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = { transporter };
