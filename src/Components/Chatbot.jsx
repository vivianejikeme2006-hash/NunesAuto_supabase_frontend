import { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm the NunesAuto AI Assistant. How can I help you today?",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim() || isTyping) return;

    const userMessage = message.trim();

    // Add user's message
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    // Clear input
    setMessage("");

    // Show typing message
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "bot",
        typing: true,
      },
    ]);

    setIsTyping(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_RENDER_URL_BACKEND}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Replace typing message with AI response
      setMessages((previousMessages) => {
        const updatedMessages = [...previousMessages];

        updatedMessages[updatedMessages.length - 1] = {
          sender: "bot",
          text: data.reply,
        };

        return updatedMessages;
      });

    } catch (error) {
      console.error("Chatbot error:", error);

      // Replace typing message with error message
      setMessages((previousMessages) => {
        const updatedMessages = [...previousMessages];

        updatedMessages[updatedMessages.length - 1] = {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
        };

        return updatedMessages;
      });

    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chatbot button */}
      {!isOpen && (
        <button
          className="chatbotButton"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {/* Chatbot window */}
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

                {/* THIS IS THE TYPING INDICATOR */}
                {msg.typing ? (
                  <div className="typingDots">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </div>
                ) : (
                  msg.text
                )}

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
              disabled={isTyping}
            />

            <button
              onClick={sendMessage}
              disabled={isTyping || !message.trim()}
            >
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;