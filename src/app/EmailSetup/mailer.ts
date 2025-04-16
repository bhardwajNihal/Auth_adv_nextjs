// Nodemailer is a Node.js library that lets us send emails from your server.
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";

interface emailPropsType {
  email: string;
  emailType: "Verify" | "reset";
  userId: string;
}

// basic setup for sending email using nodemailer
export async function SendEmail({ email, emailType, userId }: emailPropsType) {
  try {
    // on the send email request, we need 1st check the type of the email,
    // generate a random token to be stored in the Db, in order to be compared and verified

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "Verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hr
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hr
      });
    }

    // Will be using Mailtrap
    // Mailtrap is a service that catches emails sent from development environments,
    //  so they don’t go to real users. It gives us a sandbox inbox to preview emails safely.
    // configure it , and set user and pass provided,
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject:
        emailType === "Verify" ? "Verify your Email" : "Reset your Password", // Subject line
      text: "Hello world?", // plain text body
      html: `
      <p>Click 
      <a href="${process.env.DOMAIN}/${
        emailType === "Verify"
          ? `verifyemail?token=${hashedToken}`
          : `resetpassword?token=${hashedToken}`
      }">
      here</a> 
      ${
        emailType === "Verify" ? "to verify your email" : "reset your password"
      }</p> 
      <br />
       OR <br /> 
       copy paste the link below in your browser
       <br/>
       ${process.env.DOMAIN}/${
        emailType === "Verify"
          ? `verifyemail?token=${hashedToken}`
          : `resetpassword?token=${hashedToken}`
      }`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    throw new Error("Error sending email!" + error);
  }
}
