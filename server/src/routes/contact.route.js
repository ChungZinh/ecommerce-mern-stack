const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");
const { transporter } = require("../utils/sendMail");

router.post(
  "/send-mail",
  asyncHandler(async (req, res, next) => {
    const { name, email, phone, subject, message } = req.body;
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: `Contact form submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ error: "Error sending message. Please try again later." });
    }
  })
);

module.exports = router;
