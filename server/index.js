require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./Config/passportConfig');
const authRoutes = require('./Routes/googleauth');

const  connectDB  = require('./Config/connect');
const app = express();
const port = process.env.PORT;
// const UserController = require('../Server/Controllers/ControllerUser');
// const router = express.Router();
// const userRoute = require('./Routes/userRoute');
const route = require('./Routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require("http")
const { handleChatMessage } = require('./Controllers/chatbot/ControllerChatbot.js')

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả client kết nối
    methods: ["GET", "POST"],
  },
})
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
const corsOptions = {
  origin: 'http://fe2.backendintern.online', // Địa chỉ client
  credentials: true, // Cho phép gửi cookie
};
app.use(cors(corsOptions));


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

app.use("/uploads",express.static('./uploads'))

app.use(express.json());
route(app);

console.log('Registered routes:', app._router.stack.filter(r => r.route).map(r => r.route.path));

connectDB();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


