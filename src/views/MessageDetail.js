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
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [newMessage, setnewMessage] = useState({ message: "" });
  const [newSearch, setnewSearch] = useState({ username: "" });

  const { id } = useParams();
  const axios = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const username = decoded.username;
  const navigate = useNavigate();

  // Load user conversations
  useEffect(() => {
    axios
      .get(`${baseURL}/my-messages/${user_id}/`)
      .then((res) => setMessages(res.data))
      .catch(console.log);
  }, [user_id]);

  // Load message history
  useEffect(() => {
    axios
      .get(`${baseURL}/get-messages/${user_id}/${id}/`)
      .then((res) => setMessage(res.data))
      .catch(console.log);
  }, [user_id, id]);

  // Auto-refresh messages
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${baseURL}/get-messages/${user_id}/${id}/`)
        .then((res) => setMessage(res.data))
        .catch(console.log);
    }, 3000);

    return () => clearInterval(interval);
  }, [user_id, id]);

  // Scroll to bottom when message updates
  useEffect(() => {
    const chatBox = document.querySelector(".chat-messages");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [message]);

  // Profile info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${baseURL}/profile/${id}/`);
        setProfile(res.data);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (event) => {
    setnewMessage({ ...newMessage, [event.target.name]: event.target.value });
  };

  const SendMessage = () => {
    const formdata = new FormData();
    formdata.append("user", user_id);
    formdata.append("sender", user_id);
    formdata.append("receiver", id);
    formdata.append("message", newMessage.message);
    formdata.append("is_read", false);

    axios
      .post(`${baseURL}/send-messages/`, formdata)
      .then(() => {
        setnewMessage({ message: "" });
        document.getElementById("text-input").value = "";
      })
      .catch(console.log);
  };

  const handleSearchChange = (event) => {
    setnewSearch({ ...newSearch, [event.target.name]: event.target.value });
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
    <main className="content mt-5">
      {/* Mobile Header */}

      <div className="mobile-chat-header d-lg-none">
        <button className="back-button" onClick={() => navigate("/inbox/")}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <img
          src={
            message.length > 0
              ? message[0].sender === user_id
                ? message[0].receiver_profile.image
                : message[0].sender_profile.image
              : "https://via.placeholder.com/40"
          }
          alt="profile"
        />
        <div>
          <h5>
            {message.length > 0
              ? message[0].sender === user_id
                ? message[0].receiver_profile.full_name
                : message[0].sender_profile.full_name
              : "Loading..."}
          </h5>
          <small>Online</small>
        </div>
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
                    style={{ border: "none", borderRadius: "50%" }}
                    onClick={SearchUser}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>

              {messages.map((message) => (
                <Link
                  key={message.id}
                  to={
                    "/inbox/" +
                    (message.sender === user_id
                      ? message.receiver
                      : message.sender) +
                    "/"
                  }
                  className="list-group-item list-group-item-action border-0"
                >
                  <small>
                    <div className="badge bg-success float-right text-white">
                      {moment.utc(message.date).local().fromNow()}
                    </div>
                  </small>
                  <div className="d-flex align-items-start">
                    <img
                      src={
                        message.sender === user_id
                          ? message.receiver_profile.image ||
                            "https://via.placeholder.com/40"
                          : message.sender_profile.image ||
                            "https://via.placeholder.com/40"
                      }
                      className="rounded-circle shadow-sm mr-1"
                      alt="profile"
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", border: "1px solid #ddd" }}
                    />
                    <div className="flex-grow-1 ml-3">
                      <div className="font-weight-bold">
                        {message.sender === user_id
                          ? message.receiver_profile.full_name
                          : message.sender_profile.full_name}
                      </div>
                      <div className="small text-muted mt-1 truncate">
                        {message.message}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>

            {/* Chat Panel */}
            <div className="col-12 col-lg-7 col-xl-9">
              {/* Desktop Header */}
              <div className="py-2 px-4 border-bottom d-none d-lg-block">
                <div className="d-flex align-items-center py-1">
                  <img
                    src={
                      message.length > 0
                        ? message[0].sender === user_id
                          ? message[0].receiver_profile.image
                          : message[0].sender_profile.image
                        : "https://via.placeholder.com/40"
                    }
                    className="rounded-circle shadow-sm mr-1"
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", border: "1px solid #ddd" }}
                  />
                  <div className="flex-grow-1 pl-3">
                    <strong>
                      {message.length > 0
                        ? message[0].sender === user_id
                          ? message[0].receiver_profile.full_name
                          : message[0].sender_profile.full_name
                        : "Loading..."}
                    </strong>
                    <div className="text-muted small">
                      <em>Online</em>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages Scrollable Area */}
              <div className="position-relative">
                <div
                  className="chat-messages p-4"
                  style={{ height: "calc(100vh - 180px)" }}
                >
                  {message.map((msg, index) => (
                    <React.Fragment key={index}>
                      {msg.sender === user_id ? (
                        <div className="chat-message-right pb-3">
                          <div className="message-meta">
                            <small className="text-muted">
                              {moment.utc(msg.date).local().fromNow()}
                            </small>
                          </div>
                          <div className="message-bubble sent">
                            {msg.message}
                          </div>
                        </div>
                      ) : (
                        <div className="chat-message-left pb-3">
                          <div className="d-flex align-items-center mb-1">
                            <img
                              src={
                                msg.sender_profile.image ||
                                "https://via.placeholder.com/40"
                              }
                              className="rounded-circle shadow-sm mr-2"
                              alt={msg.sender_profile.full_name}
                              width={32}
                              height={32}
                            />
                            <div className="message-meta">
                              <strong className="d-block">
                                {msg.sender_profile.full_name}
                              </strong>
                              <small className="text-muted">
                                {moment.utc(msg.date).local().fromNow()}
                              </small>
                            </div>
                          </div>
                          <div className="message-bubble received">
                            {msg.message}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Chat Input */}
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
                      onClick={SendMessage}
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default MessageDetail;
