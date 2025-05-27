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

  // Load all conversations/messages of the user
  useEffect(() => {
    axios
      .get(`${baseURL}/my-messages/${user_id}/`)
      .then((res) => setMessages(res.data))
      .catch(console.log);
  }, [user_id]);

  // Load messages with the particular user (id)
  useEffect(() => {
    axios
      .get(`${baseURL}/get-messages/${user_id}/${id}/`)
      .then((res) => setMessage(res.data))
      .catch(console.log);
  }, [user_id, id]);

  // Load profile of the user on chat sidebar
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

  // Handle new message input change
  const handleChange = (event) => {
    setnewMessage({
      ...newMessage,
      [event.target.name]: event.target.value,
    });
  };

  // Send message to the server
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

  // Search user input change
  const handleSearchChange = (event) => {
    setnewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });
  };

  // Search user and navigate
  const SearchUser = () => {
    axios
      .get(`${baseURL}/search/${newSearch.username}/`)
      .then(() => {
        navigate(`/search/${newSearch.username}/`);
      })
      .catch(() => {
        alert("User Does Not Exist");
      });
  };

  return (
    <main className="content" style={{ marginTop: "150px" }}>
      <div className="container p-0">
        <h1 className="h3 mb-3">Messages</h1>
        <div className="card">
          <div className="row g-0">
            {/* Sidebar - User List */}
            <div className="col-12 col-lg-5 col-xl-3 border-right">
              <div className="px-4">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 d-flex align-items-center mt-2">
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
                      {moment.utc(message.date).local().startOf("seconds").fromNow()}
                    </div>
                  </small>
                  <div className="d-flex align-items-start">
                    <img
                      src={
                        message.sender === user_id
                          ? message.receiver_profile.image || "https://via.placeholder.com/40"
                          : message.sender_profile.image || "https://via.placeholder.com/40"
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
                          ? message.receiver_profile.full_name || "Unknown User"
                          : message.sender_profile.full_name || "Unknown User"}
                      </div>
                      <div
                        className="small text-muted mt-1 truncate"
                        title={message.message}
                        style={{ maxWidth: "250px" }}
                      >
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
              {/* Chat Header */}
              <div className="py-2 px-4 border-bottom d-none d-lg-block">
                <div className="d-flex align-items-center py-1">
                  <div className="position-relative">
                    <img
                      src={
                        message.length > 0
                          ? message[0].sender === user_id
                            ? message[0].receiver_profile.image || "https://via.placeholder.com/40"
                            : message[0].sender_profile.image || "https://via.placeholder.com/40"
                          : "https://via.placeholder.com/40"
                      }
                      className="rounded-circle shadow-sm mr-1"
                      alt="Receiver Profile"
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", border: "1px solid #ddd" }}
                    />
                  </div>
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

              {/* Chat Messages */}
              <div className="position-relative">
                <div className="chat-messages p-4">
                  {message.map((msg, index) => (
                    <React.Fragment key={index}>
                      {msg.sender === user_id ? (
                        // Right-side message
                        <div className="chat-message-right pb-4">
                          <div>
                            <img
                              src={msg.sender_profile.image || "https://via.placeholder.com/40"}
                              className="rounded-circle shadow-sm mr-1"
                              alt={msg.sender_profile.full_name}
                              style={{ objectFit: "cover", width: "40px", height: "40px", border: "1px solid #ddd" }}
                            />
                            <div className="text-muted small text-nowrap mt-2">
                              {moment.utc(msg.date).local().startOf("seconds").fromNow()}
                            </div>
                          </div>
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            <div className="font-weight-bold mb-1">You</div>
                            {msg.message}
                          </div>
                        </div>
                      ) : (
                        // Left-side message
                        <div className="chat-message-left pb-4">
                          <div>
                            <img
                              src={msg.sender_profile.image || "https://via.placeholder.com/40"}
                              className="rounded-circle shadow-sm mr-1"
                              alt={msg.sender_profile.full_name}
                              style={{ objectFit: "cover", width: "40px", height: "40px", border: "1px solid #ddd" }}
                            />
                            <div className="text-muted small text-nowrap mt-2">
                              {moment.utc(msg.date).local().startOf("seconds").fromNow()}
                            </div>
                          </div>
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                            <div className="font-weight-bold mb-1">{msg.sender_profile.full_name}</div>
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
                      style={{ borderRadius: "50px 0 0 50px", paddingLeft: "20px" }}
                    />
                    <button
                      onClick={SendMessage}
                      className="btn btn-primary"
                      style={{ borderRadius: "0 50px 50px 0", padding: "0 25px", fontWeight: "500" }}
                    >
                      <i className="fas fa-paper-plane me-1"></i> Send
                    </button>
                  </div>
                </div>
              </div>
              {/* End Chat Panel */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MessageDetail;
