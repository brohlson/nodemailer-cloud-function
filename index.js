/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "foo@bar.com", // Make a dummy Gmail Account
    pass: "password" // Enable less secure apps to use it
  }
});

exports.contactForm = (req, res) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  let data = req.query.data || req.body.data;
  let { first, last, email, phone, subject, comments } = data;

  let mailOptions = {
    from: `Foo Notifications <foonotifications@gmail.com>`, // Standard `from` details
    to: "to@gmail.com", // Who it should go to
    bcc: "bcc@gmail.com", // Who else it should fo to
    subject: subject,
    html: `<h3>User Details</h3><p>${first} ${last}</p><p>${email}</p><p>${phone}</p><h3>Message</h3><p>${comments}</p>`
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(info);
    }
  });
};
