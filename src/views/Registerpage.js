import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Registerpage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(email, username, password, password2);
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center my-5">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Account ✨</h2>
                  <p className="text-muted">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Choose a username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Re-enter password"
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Register
                    </button>
                  </div>

                  <div className="text-end mt-3">
                    <Link to="/forgot-password" className="small text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>

                  <hr className="my-4" />

                  <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="fw-semibold text-decoration-none">
                      Login Now
                    </Link>
                  </p>

                  <div className="text-center mt-3">
                    <Link to="/terms" className="small text-muted me-3">
                      Terms of Use
                    </Link>
                    <Link to="/privacy" className="small text-muted">
                      Privacy Policy
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
