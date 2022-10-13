const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kasirecivanna@gmail.com",
    pass: process.env.PASSWORD,
  },
});

router.post("/email", async (req, res) => {
  const body = req.body;
  const mailOptions = {
    from: "kasirecivanna@gmail.com",
    to: "wardcompanyua@gmail.com",
    subject: "You have new message from client!",
    text:
      `Client data ` + body.firstName &&
      `firstName: ${body.firstName}` + body.lastName &&
      ` lastName: ${body.lastName}` + body.email &&
      ` email: ${body.email}` + body.tel &&
      ` tel: ${body.tel}` + body.company &&
      ` company: ${body.company}` + body.website &&
      ` website: ${body.website}` + body.help &&
      ` help: ${body.help}` + body.budget &&
      ` budget: ${body.budget}` + body.fieldType &&
      ` What are you looking for?: ${body.fieldType.forEach(
        (el) => ` ${el},`
      )}` + body.classificationArray &&
      ` Business classification: ${body.classificationArray.forEach(
        (el) => ` ${el},`
      )}`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(401);
      res.send({ error: error });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200);
      res.send({ message: info.response });
    }
  });
});

module.exports = router;
