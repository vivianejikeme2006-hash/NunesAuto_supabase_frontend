import { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm the NunesAuto AI Assistant. How can I help you today?",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();

    // Add user's message
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    // Temporary AI response
    setTimeout(() => {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "bot",
          text: "🚗 Thanks for contacting NunesAuto! I can help you find car parts. Please tell me the vehicle make and model.",
        },
      ]);
    }, 800);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbotButton"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbotContainer">

          {/* Header */}
          <div className="chatbotHeader">
            <div>
              <h3>🤖 NunesAuto AI</h3>
              <span>Online</span>
            </div>

            <button
              className="chatbotClose"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbotMessages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "userMessage"
                    : "botMessage"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chatbotInput">
            <input
              type="text"
              placeholder="Ask about car parts..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;