import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const baseURL = "https://chat-backend-ten-orcin.vercel.app/api";
  const imageBaseURL = "https://chat-backend-ten-orcin.vercel.app/media/";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/users/`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading users...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  const handleUserClick = (userId) => {
    navigate(`/inbox/${userId}/`);
  };

  return (
    <div className="container mt-5">
      <main className="content" style={{ marginTop: "100px" }}>
        <div className="container p-0">
          <h4 className="mb-3">Chats</h4>

          <div
            style={{
              maxHeight: "500px",
              overflowY: "scroll",  // scroll বার সবসময় দেখাবে
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <ul className="list-group list-group-flush">
              {users.map((user) => {
                const profile = user.profile || {};
                const imageUrl = profile.image
                  ? imageBaseURL + profile.image
                  : "https://via.placeholder.com/40?text=DP";

                return (
                  <li
                    key={user.id}
                    className="list-group-item d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUserClick(user.id)}
                  >
                    {/* Profile Image */}
                    <img
                      src={imageUrl}
                      alt={user.username}
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />

                    {/* Name and Bio */}
                    <div className="flex-grow-1">
                      <div className="fw-bold">{user.full_name}</div>
                      <small className="text-muted">
                        {profile.bio || "Hey there! I am using ChatApp."}
                      </small>
                    </div>

                    {/* Optional Time + Blue dot */}
                    <div className="text-end">
                      <small className="text-muted">Just now</small>
                      <div
                        className="bg-primary rounded-circle mt-1 ms-2"
                        style={{ width: "10px", height: "10px" }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllUsers;
