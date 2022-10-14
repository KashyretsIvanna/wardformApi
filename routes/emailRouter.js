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
router.get("/email", async (req, res) => {
  res.status(200).json("Hello WARD");
});

router.post("/email", async (req, res) => {
  const body = req.body;
  console.log(req.body);
  const mailOptions = {
    from: "kasirecivanna@gmail.com",
    to: "wardcompanyua@gmail.com",
    subject: "You have new message from client!",
    text:
      `Client data ` +
      `firstName: ${body.firstName && body.firstName}` +
      ` lastName: ${body.lastName && body.lastName}` +
      ` email: ${body.email && body.email}` +
      ` tel: ${body.tel && body.tel}` +
      ` company: ${body.company && body.company}` +
      ` website: ${body.website && body.website}` +
      ` help: ${body.help && body.help}` +
      ` budget: ${body.budget && body.budget}` +
      ` What are you looking for?: ${
        body.fieldType && body.fieldType.toString()
      }` +
      ` Business classification: ${
        body.classificationArray && body.classificationArray.toString()
      }`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(401);
      res.send({ error: "error" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200);
      res.send({ message: info.response });
    }
  });
});

router.post("/onlyemail", async (req, res) => {
  const body = req.body;
  console.log(req.body);
  const mailOptions = {
    from: "kasirecivanna@gmail.com",
    to: "wardcompanyua@gmail.com",
    subject: "Client has just subscribed our news",
    text: `Client data ` + ` email: ${body.email && body.email}`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(401);
      res.send({ error: "error" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200);
      res.send({ message: info.response });
    }
  });
});

module.exports = router;
