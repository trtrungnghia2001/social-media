import nodemailer from "nodemailer";
import ENV_CONFIG from "#server/configs/env.config"; // Đảm bảo bạn có cấu hình email trong ENV_CONFIG
import path from "path"; // Để xử lý đường dẫn file
import ejs from "ejs";
import { fileURLToPath } from "url";

// 1. Tạo transporter: Đây là đối tượng chịu trách nhiệm gửi email.
// Cấu hình transporter với thông tin SMTP của nhà cung cấp email của bạn (ví dụ: Gmail, SendGrid, Mailgun)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV_CONFIG.EMAIL_USER, // Email của bạn (từ đó email sẽ được gửi đi)
    pass: ENV_CONFIG.EMAIL_PASSWORD, // Mật khẩu email của bạn hoặc App Password (đối với Gmail)
  },
  tls: {
    rejectUnauthorized: ENV_CONFIG.IS_PRODUCTION,
  },
});

// Hàm chung để gửi email
const sendEmail = async (options) => {
  // 2. Render template EJS
  const __dirname = path.resolve(fileURLToPath(import.meta.url));
  const templatePath = path.join(
    __dirname,
    "../../views",
    options.templateName
  ); // options.templateName là 'password-reset.ejs'
  const htmlContent = await ejs.renderFile(templatePath, options.templateData); // options.templateData là { resetUrl: '...' }

  // 3. Định nghĩa tùy chọn email
  const mailOptions = {
    from: `Your App <${ENV_CONFIG.EMAIL_USER}>`, // Người gửi hiển thị
    to: options.email, // Email người nhận
    subject: options.subject, // Chủ đề email
    html: htmlContent, // Nội dung email dưới dạng HTML
    // text: options.message, // Hoặc nội dung dưới dạng văn bản thuần
  };

  // 3. Gửi email
  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    await sendEmail({
      email: email,
      subject: "Password Reset Request",
      templateName: "password-reset.ejs", // Tên template
      templateData: { resetUrl }, // Dữ liệu truyền vào template
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email!");
  }
};

export default sendEmail;
