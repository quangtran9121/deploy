const { handleChatMessage } = require("./ControllerChatbot");

(async () => {
  const response = await handleChatMessage("Hello, chatbot!");
  console.log("Chatbot Response:", response);
})();
