import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import moment from "moment";
import "./style/Message.css";

function Message() {
  const baseURL = "http://127.0.0.1:8000/api";
  const [messages, setMessages] = useState([]);
  const [newSearch, setNewSearch] = useState({ username: "" });
  const axios = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${baseURL}/my-messages/${user_id}/`)
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        history.push("/search/" + newSearch.username + "/");
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
          <div className="col-12 col-lg-5 col-xl-3 border-right">
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
                  {message.sender !== user_id && (
                    <img
                      src={message.sender_profile.image}
                      className="rounded-circle mr-1 profile-photo"
                      alt="sender"
                      width={40}
                      height={40}
                    />
                  )}
                  {message.sender === user_id && (
                    <img
                      src={message.receiver_profile.image}
                      className="rounded-circle mr-1 profile-photo"
                      alt="receiver"
                      width={40}
                      height={40}
                    />
                  )}
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

          <hr className="d-block d-lg-none mt-1 mb-0" />

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-phone feather-lg"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </button>
                  <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-video feather-lg"
                    >
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                    </svg>
                  </button>
                  <button className="btn btn-light border btn-lg px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-horizontal feather-lg"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={19} cy={12} r={1} />
                      <circle cx={5} cy={12} r={1} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="position-relative">
              <div className="chat-messages p-4">
                {/* Chat messages here */}
                {/* ... */}
              </div>
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
