import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import moment from "moment";
import "./style/Message.css";

function Message() {
  const baseURL = "https://chat-backend-ten-orcin.vercel.app/api";
  const [messages, setMessages] = useState([]);
  const [newSearch, setNewSearch] = useState({ username: "" });

  const axios = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = () => {
      console.log("Fetching messages at", new Date().toLocaleTimeString());
      axios
        .get(`${baseURL}/my-messages/${user_id}/`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 20000); // প্রতি ৫ সেকেন্ডে রিফ্রেশ

    return () => clearInterval(intervalId); // ক্লিনআপ
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
    <div>
      <main className="content" style={{ marginTop: "150px" }}>
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card">
            <div className="row g-0">

              {/* মোবাইলে সার্চ এবং প্রোফাইল কারোসেল */}
              <div className="d-block d-lg-none px-3 py-3">
                <div className="d-flex align-items-center mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    name="username"
                  />
                  <button
                    className="ml-2"
                    onClick={SearchUser}
                    style={{ border: "none", borderRadius: "50%", background: "none" }}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                <div className="profile-carousel">
                  {messages.map((message) => {
                    const profile =
                      message.sender === user_id
                        ? message.receiver_profile
                        : message.sender_profile;
                    const user =
                      message.sender === user_id ? message.receiver : message.sender;

                    return (
                      <Link
                        key={message.id}
                        to={`/inbox/${user}/`}
                        className="profile-item"
                      >
                        <img
                          src={profile.image}
                          alt="Profile"
                          className="rounded-circle"
                          width={50}
                          height={50}
                        />
                        <div
                          className="small mt-1 text-truncate"
                          style={{ maxWidth: "60px" }}
                        >
                          {profile.full_name?.split(" ")[0] || "User"}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Desktop - Sidebar */}
              <div className="col-12 col-lg-5 col-xl-3 border-right d-none d-lg-block">
                <div className="px-4">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 d-flex align-items-center mt-2">
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        name="username"
                      />
                      <button
                        className="ml-2"
                        onClick={SearchUser}
                        style={{ border: "none", borderRadius: "50%" }}
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
                        {moment
                          .utc(message.date)
                          .local()
                          .startOf("seconds")
                          .fromNow()}
                      </div>
                    </small>
                    <div className="d-flex align-items-start">
                      <img
                        src={
                          message.sender === user_id
                            ? message.receiver_profile.image
                            : message.sender_profile.image
                        }
                        className="rounded-circle mr-1 profile-photo"
                        alt="profile"
                        width={40}
                        height={40}
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
              </div>

              {/* Message View Area */}
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1 profile-photo"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>Sharon Lessman</strong>
                      <div className="text-muted small">
                        <em>Online</em>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-lg mr-1 px-3">
                        📞
                      </button>
                      <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                        📹
                      </button>
                      <button className="btn btn-light border btn-lg px-3">
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>

                <div className="position-relative">
                  <div className="chat-messages p-4">{/* Chat here */}</div>
                </div>

                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                    />
                    <button className="btn btn-primary" type="button">
                      Send
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Message;
