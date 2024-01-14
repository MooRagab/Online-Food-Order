import nodemailer from "nodemailer";

async function sendEmail(dest: any, subject: any, message: any) {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: `"Ragab" <${process.env.SENDER_EMAIL}>`,
      to: dest,
      subject,

      html: message,
    });
    // console.log(info);
  } catch (error) {
    // console.log("Email sent error: " + error);
  }
}

const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  try {
    const accountSid = "ACa53f25c359c2e5224b1aecfa739e05b9";
    const authToken = "a031d82b55912c9577df52fee31cf648";
    const client = require("twilio")(accountSid, authToken);

    const response = await client.message.create({
      body: `Your OTP is ${otp}`,
      from: "+201004068671",
      to: `recipient_countrycode${toPhoneNumber}`, // recipient phone number // Add country before the number
    });

    return response;
  } catch (error) {
    return false;
  }
};

export { sendEmail, GenerateOtp, onRequestOTP };
