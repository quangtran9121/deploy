// const { OpenAIApi } = require("openai");
// require("dotenv").config(); // Đảm bảo file .env được tải

// // Tạo đối tượng OpenAIApi trực tiếp
// const openai = new OpenAIApi({
//   apiKey: process.env.CHATBOT_KEY, // Lấy API key từ biến môi trường
//   basePath: "https://api.openai.com/v1", // Đường dẫn API
// });

// // Hàm xử lý logic chatbot
// const handleChatMessage = async (message) => {
//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//     });

//     // Trả về phản hồi từ OpenAI
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("OpenAI API Error:", error.response?.data || error.message);
//     return "Sorry, something went wrong.";
//   }
// };

// // Xuất hàm để sử dụng ở nơi khác
// module.exports = { handleChatMessage };
