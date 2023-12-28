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

export default sendEmail;
