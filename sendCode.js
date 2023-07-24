const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendCode = async (email, verify, code) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nutritionapp7@gmail.com',
      pass: 'afzttirvjllddhre'
    }
  });

  var mailOptions = {
    from: 'nutritionapp7@gmail.com',
    to: email,
    subject: verify,
    text: 'This is your code for ' + verify + ': ' + code
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
};

module.exports = sendCode;
