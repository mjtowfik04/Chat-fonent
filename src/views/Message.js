import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import moment from "moment";
import "./style/Message.css";

function Message() {
  const baseURL = "https://chat-backend-ten-orcin.vercel.app/api";
  const imageBaseURL = "https://chat-backend-ten-orcin.vercel.app/media/";

  const [messages, setMessages] = useState([]);
  const [newSearch, setNewSearch] = useState({ username: "" });
  const [selectedChat, setSelectedChat] = useState(null);

  const axios = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get(`${baseURL}/my-messages/${user_id}/`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 20000);
    return () => clearInterval(intervalId);
  }, [axios, baseURL, user_id]);

  const handleSearchChange = (event) => {
    setNewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });
  };

  const SearchUser = () => {
    axios
      .get(`${baseURL}/search/${newSearch.username}/`)
      .then(() => {
        navigate("/search/" + newSearch.username + "/");
      })
      .catch(() => {
        alert("User Does Not Exist");
      });
  };

  return (
    <div className="mobile-message-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <h1 className="mobile-title">Messages</h1>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search-container">
        <div className="mobile-search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="mobile-search-input"
            placeholder="Search..."
            onChange={handleSearchChange}
            name="username"
          />
        </div>
      </div>

      {/* Mobile Message List */}
      <div className="mobile-message-list">
        {messages.map((message) => {
          const isSender = message.sender === user_id;
          const profile = isSender
            ? message.receiver_profile
            : message.sender_profile;
          const user = isSender ? message.receiver : message.sender;
          const lastMessageTime = moment.utc(message.date).local().fromNow();
          const isUnread = !message.is_read && !isSender;

          return (
            <Link
              key={message.id}
              to={`/inbox/${user}/`}
              className={`mobile-message-item ${isUnread ? 'unread' : ''}`}
            >
              <div className="message-avatar-container">
                <img
                  src={profile.image ? imageBaseURL + profile.image : "https://via.placeholder.com/50"}
                  alt="Profile"
                  className="message-avatar"
                />
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">{profile.full_name || "Unknown User"}</span>
                  <span className="message-time">{lastMessageTime}</span>
                </div>
                <div className="message-preview">
                  {message.message.length > 30 
                    ? `${message.message.substring(0, 30)}...` 
                    : message.message}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Desktop view (hidden on mobile) */}
      <div className="d-none d-lg-block">
        <main className="content" style={{ marginTop: "150px" }}>
          {/* ... existing desktop code ... */}
        </main>
      </div>

      <style jsx>{`
        .mobile-message-container {
          padding: 15px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .mobile-header {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          margin-bottom: 15px;
        }
        
        .mobile-title {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
        }
        
        .mobile-search-container {
          margin-bottom: 20px;
        }
        
        .mobile-search-box {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 20px;
          padding: 8px 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .search-icon {
          color: #999;
          margin-right: 10px;
        }
        
        .mobile-search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
        }
        
        .mobile-message-list {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .mobile-message-item {
          display: flex;
          padding: 12px 15px;
          border-bottom: 1px solid #f0f0f0;
          text-decoration: none;
          color: #333;
        }
        
        .mobile-message-item.unread {
          background-color: #f8f9fa;
        }
        
        .message-avatar-container {
          margin-right: 12px;
        }
        
        .message-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .message-content {
          flex: 1;
          min-width: 0;
        }
        
        .message-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .message-sender {
          font-weight: 600;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .message-time {
          color: #999;
          font-size: 12px;
          white-space: nowrap;
          margin-left: 10px;
        }
        
        .message-preview {
          color: #666;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}

export default Message;