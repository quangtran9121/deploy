require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./Config/passportConfig');
const authRoutes = require('./Routes/googleauth');

const connectDB = require('./Config/connect');
const app = express();
const port = process.env.PORT;
const route = require('./Routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require("socket.io");
const https = require("https");
const fs = require("fs");
const { handleChatMessage } = require('./Controllers/chatbot/ControllerChatbot.js');

// Đọc chứng chỉ SSL từ file (bạn cần có chứng chỉ SSL)
const privateKey = fs.readFileSync('/etc/letsencrypt/live/fe2.backendintern.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/fe2.backendintern.online/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/path/to/your/ca.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

const server = https.createServer(credentials, app); // Sử dụng https.createServer thay vì http.createServer

const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả client kết nối
    methods: ["GET", "POST"],
  },
});

// Sử dụng Socket.IO để giao tiếp
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (message) => {
    console.log("Message received:", message);

    // Sử dụng module chatbot để xử lý
    const botReply = await handleChatMessage(message);

    // Gửi phản hồi đến client
    socket.emit("botReply", botReply);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cookieParser());

const allowedOrigins = ['https://fe2.backendintern.online', 'http://45.77.32.24:9121'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware cho session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);

app.use("/uploads", express.static('./uploads'));

app.use(express.json());
route(app);

console.log('Registered routes:', app._router.stack.filter(r => r.route).map(r => r.route.path));

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Lắng nghe server HTTPS
server.listen(port, () => {
  console.log(`Server is running on HTTPS port ${port}`);
});
