import React, { useState, useEffect, useContext } from "react";
import socket from "../../utils/socketConfig";
import UserContext from "../../utils/UserContext";
import "./AdminChat.css";

const AdminChat = () => {
  const { user } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (user) {
      socket.emit("getRooms");

      const handleRooms = (rooms) => {
        setRooms(rooms);
      };

      const handleMessage = (message) => {
        if (selectedRoom && message.sessionId === selectedRoom._id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      socket.on("rooms", handleRooms);
      socket.on("message", handleMessage);

      return () => {
        socket.off("rooms", handleRooms);
        socket.off("message", handleMessage);
      };
    }
  }, [user, selectedRoom]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setMessages(room.messages);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && selectedRoom) {
      const message = { sender: "ADMIN", text: newMessage, sessionId: selectedRoom._id };
      socket.emit("sendMessage", { roomId: selectedRoom.roomId, message });
      setMessages([...messages, message]); 
      setNewMessage("");
    }
  };

  const Image = {
    admin: require("../../assets/admin.png"),
    user: require("../../assets/man.png"),
  };

  return (
    <div className="admin-chat">
      <div className="chat-sidebar">
        <h3>Active Chats</h3>
        <div className="room-list">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className={`room ${room.roomId === selectedRoom?.roomId ? "active" : ""}`}
              onClick={() => handleRoomClick(room)}
            >
              <img src={Image.user} alt="User Icon" />
              <span>{room.roomId}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-main">
        {selectedRoom ? (
          <>
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
                  <i className="fas fa-paper-plane"></i> Send
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
