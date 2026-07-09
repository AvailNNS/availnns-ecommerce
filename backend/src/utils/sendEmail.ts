import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async ({
  email,
  subject,
  message,
}: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NOPTRIX" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: message,
  });
};

export default sendEmail;