const nodemailer = require('nodemailer');
const { google } = require('googleapis'); 
require('dotenv').config(); 

// Thông tin OAuth2 từ Google Cloud Console
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async (to, token, otp) => {
    try {
        // console.log("Client ID:", CLIENT_ID);
        // console.log("Client Secret:", CLIENT_SECRET);
        // console.log("Redirect URI:", REDIRECT_URI);
        // console.log("Refresh Token:", REFRESH_TOKEN);

        // Lấy Access Token
        const accessToken = await oAuth2Client.getAccessToken();
        // console.log("Access Token:", accessToken);
        // Cấu hình transporter của Nodemailer với OAuth2
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'quanggraduationproject@gmail.com', // Địa chỉ Gmail của bạn
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken // Sử dụng Access Token
            }
        });

        // Cấu hình nội dung email
        const mailOptions = {   
            from: '"XGAME DISTRIBUTION" <quanggraduationproject@gmail.com>',
            to: to,
            subject: "Reset Password",
            text: 'Quang Check',
            html: `<b>
            Dear ${to} <br>
            Mã OTP thiết lập lại mật khẩu là: ${otp} <br>
            Token: ${token} <br>
            </b>`,
        };

        // Gửi email
        const result = await transporter.sendMail(mailOptions);
        // console.log('Email sent:', result);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendEmail;

