import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Loginpage() {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);
    // console.log(email, password);
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Welcome Back 👋</h2>
                  <p className="text-muted">Sign into your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example17">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form2Example17"
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example27">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form2Example27"
                      className="form-control form-control-lg"
                      name="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Login
                    </button>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link to="/forgot-password" className="small text-decoration-none">
                      Forgot password?
                    </Link>
                    <Link to="/dashboard" className="small text-decoration-none">
                      Go to Dashboard
                    </Link>
                  </div>

                  <hr className="my-4" />

                  <p className="text-center mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="fw-semibold text-decoration-none">
                      Register Now
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

export default Loginpage;
