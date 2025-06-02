import React, { useState, useEffect } from "react";
import "./style/Message.css";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";

function MessageDetail() {
  const baseURL = "https://chat-backend-ten-orcin.vercel.app/api";

  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});
  const [newMessage, setNewMessage] = useState({ message: "" });
  const [newSearch, setNewSearch] = useState({ username: "" });

  const { id } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const username = decoded.username;

  useEffect(() => {
    axios
      .get(`${baseURL}/my-messages/${user_id}/`)
      .then((res) => setMessages(res.data))
      .catch(console.log);
  }, [user_id]);

  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get(`${baseURL}/get-messages/${user_id}/${id}/`)
        .then((res) => setMessage(res.data))
        .catch(console.log);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [user_id, id]);

  useEffect(() => {
    const chatBox = document.querySelector(".chat-messages");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [message]);

  useEffect(() => {
    axios
      .get(`${baseURL}/profile/${id}/`)
      .then((res) => setProfile(res.data))
      .catch(console.log);
  }, [id]);

  const handleChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    const formdata = new FormData();
    formdata.append("user", user_id);
    formdata.append("sender", user_id);
    formdata.append("receiver", id);
    formdata.append("message", newMessage.message);
    formdata.append("is_read", false);

    axios
      .post(`${baseURL}/send-messages/`, formdata)
      .then(() => {
        setNewMessage({ message: "" });
        document.getElementById("text-input").value = "";
      })
      .catch(console.log);
  };

  const handleSearchChange = (e) => {
    setNewSearch({ ...newSearch, [e.target.name]: e.target.value });
  };

  const searchUser = () => {
    axios
      .get(`${baseURL}/search/${newSearch.username}/`)
      .then(() => navigate(`/search/${newSearch.username}/`))
      .catch(() => alert("User does not exist"));
  };

  const getOtherUser = (msg) =>
    msg.sender === user_id ? msg.receiver_profile : msg.sender_profile;

  return (
    <main className="content mt-5">
      <div className="mobile-chat-header d-lg-none d-flex align-items-center p-2 border-bottom bg-black shadow-sm">
        <button
          className="btn btn-link text-dark p-0 mr-3"
          onClick={() => navigate("/inbox/")}
        >
          <i className="fas fa-arrow-left fa-lg"></i>
        </button>

        {message.length > 0 && (
          <>
            <img
              src={
                getOtherUser(message[0]).image
                  ? `https://res.cloudinary.com/dzdkjttcz/${
                      getOtherUser(message[0]).image
                    }`
                  : "https://via.placeholder.com/50"
              }
              alt="profile"
              className="rounded-circle shadow-sm"
              width={45}
              height={45}
              style={{ objectFit: "cover", border: "1px solid #ddd" }}
            />
            <div className="ml-2">
              <h6 className="mb-0">{getOtherUser(message[0]).full_name}</h6>
              <small className="text-muted">Online</small>
            </div>
          </>
        )}
      </div>

      <div className="container p-0">
        <h1 className="h3 mb-3 d-none d-lg-block">Messages</h1>
        <div className="card">
          <div className="row g-0">
            {/* Sidebar */}
            <div className="col-12 col-lg-5 col-xl-3 border-right d-none d-lg-block">
              <div className="px-4">
                <div className="d-flex align-items-center mt-2">
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Search..."
                    name="username"
                    onChange={handleSearchChange}
                  />
                  <button
                    className="ml-2"
                    onClick={searchUser}
                    style={{ border: "none", borderRadius: "50%" }}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>

              {messages.map((msg) => {
                const user = getOtherUser(msg);
                return (
                  <Link
                    key={msg.id}
                    to={`/inbox/${user.id}/`}
                    className="list-group-item list-group-item-action border-0"
                  >
                    <small>
                      <div className="badge bg-success float-right text-white">
                        {moment.utc(msg.date).local().fromNow()}
                      </div>
                    </small>
                    <div className="d-flex align-items-start">
                      <img
                        src={
                          user.image
                            ? `https://res.cloudinary.com/dzdkjttcz/${user.image}`
                            : "https://via.placeholder.com/50"
                        }
                        className="rounded-circle shadow-sm mr-1"
                        alt="profile"
                        width={40}
                        height={40}
                        style={{ objectFit: "cover", border: "1px solid #ddd" }}
                      />
                      <div className="flex-grow-1 ml-3">
                        <div className="font-weight-bold">{user.full_name}</div>
                        <div className="small text-muted mt-1 truncate">
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}

              <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>

            {/* Chat Panel */}
            <div className="col-12 col-lg-7 col-xl-9">
              {/* Desktop Header */}
              <div className="py-2 px-4 border-bottom d-none d-lg-block">
                <div className="d-flex align-items-center py-1">
                  {message.length > 0 && (
                    <img
                      src={
                        getOtherUser(message[0]).image
                          ? `https://res.cloudinary.com/dzdkjttcz/${
                              getOtherUser(message[0]).image
                            }`
                          : "https://via.placeholder.com/50"
                      }
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-circle shadow-sm mr-2"
                    />
                  )}

                  <div className="flex-grow-1 pl-3">
                    <strong>
                      {message.length > 0
                        ? getOtherUser(message[0]).full_name
                        : "Loading..."}
                    </strong>
                    <div className="text-muted small">
                      <em>Online</em>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="position-relative">
                <div
                  className="chat-messages p-3 p-md-4"
                  style={{
                    height: "calc(100vh - 180px)",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
                  }}
                >
                  {message.map((msg, index) => (
                    <div
                      key={index}
                      className={`d-flex mb-3 mb-md-4 ${
                        msg.sender === user_id
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`d-flex flex-column ${
                          msg.sender === user_id
                            ? "align-items-end"
                            : "align-items-start"
                        }`}
                        style={{ maxWidth: "90%", width: "100%" }}
                      >
                        {/* Message header - hidden on mobile for compact view */}
                        {msg.sender !== user_id && (
                          <div className="d-flex align-items-center mb-1 d-none d-sm-flex">
                            <img
                              src={
                                msg.sender_profile.image
                                  ? `https://res.cloudinary.com/dzdkjttcz/${msg.sender_profile.image}`
                                  : "https://via.placeholder.com/50"
                              }
                              className="rounded-circle shadow-sm me-2"
                              alt={msg.sender_profile.full_name}
                              width={32}
                              height={32}
                            />
                            <div className="message-meta">
                              <strong className="d-block text-primary">
                                {msg.sender_profile.full_name}
                              </strong>
                              <small className="text-muted">
                                {moment.utc(msg.date).local().fromNow()}
                              </small>
                            </div>
                          </div>
                        )}

                        {/* Mobile-only timestamp for sent messages */}
                        {msg.sender === user_id && (
                          <small className="text-muted mb-1 d-block d-sm-none">
                            {moment.utc(msg.date).local().fromNow()}
                          </small>
                        )}

                        {/* Message bubble */}
                        <div
                          className={`p-3 rounded-4 position-relative ${
                            msg.sender === user_id
                              ? "bg-primary text-white"
                              : "bg-light text-dark"
                          }`}
                          style={{
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                            wordWrap: "break-word",
                            fontSize: "0.95rem", // Slightly smaller text on mobile
                          }}
                        >
                          {msg.message}

                          {/* Speech bubble tip - hidden on small screens */}
                          <div
                            className={`position-absolute top-0 d-none d-sm-block ${
                              msg.sender === user_id
                                ? "end-0 translate-x-50 bg-primary"
                                : "start-0 translate-x-n50 bg-light"
                            }`}
                            style={{
                              width: "12px",
                              height: "12px",
                              transform: "rotate(45deg)",
                              marginTop: "15px",
                              boxShadow: "1px -1px 1px rgba(0,0,0,0.1)",
                            }}
                          ></div>
                        </div>

                        {/* Mobile-only metadata for received messages */}
                        {msg.sender !== user_id && (
                          <div className="d-flex align-items-center mt-1 d-sm-none">
                            <img
                              src={
                                msg.sender_profile.image
                                  ? `https://res.cloudinary.com/dzdkjttcz/${msg.sender_profile.image}`
                                  : "https://via.placeholder.com/50"
                              }
                              className="rounded-circle shadow-sm me-2"
                              alt={msg.sender_profile.full_name}
                              width={24}
                              height={24}
                            />
                            <small className="text-muted">
                              {msg.sender_profile.full_name} ·{" "}
                              {moment.utc(msg.date).local().fromNow()}
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex-grow-0 py-3 px-4 border-top bg-white">
                  <div className="input-group shadow-sm rounded-pill overflow-hidden">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Type your message..."
                      value={newMessage.message}
                      name="message"
                      id="text-input"
                      onChange={handleChange}
                      style={{
                        borderRadius: "50px 0 0 50px",
                        paddingLeft: "20px",
                      }}
                    />
                    <button
                      onClick={sendMessage}
                      className="btn btn-primary"
                      style={{
                        borderRadius: "0 50px 50px 0",
                        padding: "0 25px",
                        fontWeight: "500",
                      }}
                    >
                      <i className="fas fa-paper-plane"></i>
                      <span className="d-none d-lg-inline ml-1">Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* End Chat Panel */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MessageDetail;
