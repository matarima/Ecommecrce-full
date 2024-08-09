import React, { useState, useEffect, useContext } from "react";
import socket from "../../utils/socketConfig";
import UserContext from "../../utils/UserContext";
import "./LiveChat.css";

const LiveChat = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ADMIN", text: "Chào bạn" },
    { sender: "ADMIN", text: "Bạn có thể vào mục Shop để xem các sản phẩm" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("sessionId") || ""
  );

  useEffect(() => {
    if (user) {
      let newRoomId = localStorage.getItem("roomId");

      if (!newRoomId) {
        newRoomId = `room_${Date.now()}`;
        localStorage.setItem("roomId", newRoomId);
        setRoomId(newRoomId);
      } else {
        setRoomId(newRoomId);
      }

      const handleSessionCreated = ({ sessionId, roomId }) => {
        setSessionId(sessionId);
        setRoomId(roomId);
        localStorage.setItem("roomId", roomId);
        localStorage.setItem("sessionId", sessionId);
      };

      const handleMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.on("sessionCreated", handleSessionCreated);
      socket.on("message", handleMessage);

      if (newRoomId && user._id) {
        socket.emit("joinRoom", { roomId: newRoomId, userId: user._id });
      }

      return () => {
        socket.off("sessionCreated", handleSessionCreated);
        socket.off("message", handleMessage);
      };
    }
  }, [user]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const Image = {
    admin: require("../../assets/admin.png"),
    user: require("../../assets/man.png"),
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && sessionId) {
      const message = { sender: "USER", text: newMessage, sessionId };
      socket.emit("sendMessage", { roomId, message });
      setMessages([...messages, message]);
      setNewMessage("");
    } else {
      console.error("Session ID is missing or message is empty");
    }
  };

  const handleEndSession = () => {
    if (sessionId) {
      socket.emit("endSession", { roomId, sessionId });
      setRoomId(null);
      setSessionId(null);
      localStorage.removeItem("roomId");
      localStorage.removeItem("sessionId");
    }
  };

  return (
    <div className="live-chat">
      <div className="popup-icon" onClick={toggleChat}>
        <i className="fab fa-facebook-messenger"></i>
      </div>
      {isOpen && (
        <div className="chat-window card">
          <div className="card-header">
            <span>Customer Support</span>
            <button className="btn btn-link" onClick={toggleChat}>
              Close
            </button>
          </div>
          <div className="card-body">
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender.toLowerCase()}`}
                >
                  {message.sender === "ADMIN" ? (
                    <img
                      src={Image.admin}
                      alt="icon"
                      className="message-icon"
                    />
                  ) : null}
                  <span>{message.text}</span>
                  {message.sender === "USER" ? (
                    <img
                      src={Image.user}
                      alt="icon"
                      className="message-icon user-icon"
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Message!"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={handleSendMessage}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-danger" onClick={handleEndSession}>
              End Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
