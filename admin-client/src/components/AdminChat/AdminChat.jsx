import React, { useState, useEffect, useContext } from "react";
import socket from "../../utils/socketConfig";
import UserContext from "../../utils/UserContext";
import "./AdminChat.css";

const AdminChat = () => {
  const { user } = useContext(UserContext);
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (user && user.role === "admin") {
      const handleRooms = (rooms) => {
        setRooms(rooms);
      };

      const handleMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.on("rooms", handleRooms);
      socket.on("message", handleMessage);

      socket.emit("getRooms");

      return () => {
        socket.off("rooms", handleRooms);
        socket.off("message", handleMessage);
      };
    }
  }, [user]);

  const handleRoomClick = (room) => {
    setActiveRoom(room);
    setMessages(room.messages);
    socket.emit("joinRoom", { roomId: room.roomId, userId: user._id });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = { sender: "ADMIN", text: newMessage, sessionId: activeRoom.sessionId };
      socket.emit("sendMessage", { roomId: activeRoom.roomId, message });
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="admin-chat">
      <div className="chat-sidebar">
        <h4>Active Chats</h4>
        <div className="room-list">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className={`room ${room.roomId === activeRoom?.roomId ? "active" : ""}`}
              onClick={() => handleRoomClick(room)}
            >
              <img src={require("../../assets/man.png")} alt="User Icon" />
              <span>{room.roomId}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-main">
        {activeRoom ? (
          <>
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                  {message.sender === "ADMIN" ? (
                    <img
                      src={require("../../assets/admin.png")}
                      alt="Admin Icon"
                      className="message-icon"
                    />
                  ) : (
                    <img
                      src={require("../../assets/man.png")}
                      alt="User Icon"
                      className="message-icon user-icon"
                    />
                  )}
                  <span>{message.text}</span>
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
          </>
        ) : (
          <div className="no-active-room">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
