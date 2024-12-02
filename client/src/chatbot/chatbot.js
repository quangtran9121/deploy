// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// // Kết nối với server WebSocket
// const socket = io("https://quangtt.backendintern.online");

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     // Nhận phản hồi từ bot
//     socket.on("botReply", (botMessage) => {
//       const botResponse = { sender: "bot", text: botMessage };
//       setMessages((prevMessages) => [...prevMessages, botResponse]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (input.trim() === "") return;

//     // Gửi tin nhắn của người dùng
//     const userMessage = { sender: "user", text: input };
//     setMessages([...messages, userMessage]);

//     // Gửi tin nhắn đến server qua WebSocket
//     socket.emit("sendMessage", input);

//     setInput("");
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.chatbox}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               ...styles.message,
//               alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
//               backgroundColor: msg.sender === "user" ? "#daf7a6" : "#f1f1f1",
//             }}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div style={styles.inputContainer}>
//         <input
//           style={styles.input}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button style={styles.button} onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { display: "flex", flexDirection: "column", height: "100%", padding: 10 },
//   chatbox: {
//     flex: 1,
//     border: "1px solid #ccc",
//     borderRadius: 5,
//     padding: 10,
//     overflowY: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//     height: "300px",
//   },
//   message: {
//     padding: 10,
//     borderRadius: 5,
//     maxWidth: "60%",
//     wordWrap: "break-word",
//   },
//   inputContainer: { display: "flex", gap: 10, marginTop: 10 },
//   input: { flex: 1, padding: 10, borderRadius: 5, border: "1px solid #ccc" },
//   button: { padding: "10px 20px", borderRadius: 5, backgroundColor: "#007bff", color: "#fff", border: "none" },
// };

// export default Chatbot;
