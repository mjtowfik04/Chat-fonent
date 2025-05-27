import { useContext } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  let user_id;
  if (token) {
    try {
      const decoded = jwt_decode(token);
      user_id = decoded.user_id;
    } catch (e) {
      console.error("Invalid token:", e);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "50px",
              height: "50px",
              padding: "2px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>

            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/update">
                    My profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todo">
                    Todo
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/inbox" className="nav-link">
                    Inbox
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/users" className="nav-link " aria-current="page">
                    User
                  </Link>
                </li>
                <li className="nav-item">
                  {/* Use button or span here, not Link, since it triggers logout */}
                  <span
                    className="nav-link"
                    onClick={logoutUser}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
