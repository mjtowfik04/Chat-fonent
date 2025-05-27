import { useContext } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decoded = jwt_decode(token);
    var user_id = decoded.user_id;
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand">
            <img
              src={logo}
              alt=""
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
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              {token === null && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {token !== null && (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/update">
                      My profile
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/todo">
                      Todo
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/inbox" class="nav-link">
                      Inbox
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
