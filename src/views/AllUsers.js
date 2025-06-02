// AllUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Add this import

const AllUsers = () => {
  const baseURL = "https://chat-backend-ten-orcin.vercel.app/api";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}/users/`);
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/inbox/${userId}/`, { state: { fromAllUsers: true } });
  };

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading users...</span>
      </Spinner>
    </div>
  );
  
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-5">
      <main className="content" style={{ marginTop: "100px" }}>
        <div className="container p-0">
          <h4 className="mb-3">All Users</h4>
          <div
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <ul className="list-group list-group-flush">
              {users.map((user) => {
                const profile = user.profile || {};
                const imageUrl = profile.image
                  ? `https://res.cloudinary.com/dzdkjttcz/${profile.image}`
                  : "https://via.placeholder.com/50";

                return (
                  <li
                    key={user.id}
                    className="list-group-item d-flex align-items-center p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUserClick(user.id)}
                  >
                    <img
                      src={imageUrl}
                      alt={user.username}
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <div className="fw-bold text-truncate" style={{ maxWidth: "200px" }}>
                        {profile.full_name || user.username}
                      </div>
                      <small className="text-muted">@{user.username}</small>
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