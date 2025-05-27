// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const swal = require("sweetalert2");

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const baseurl = "https://chat-backend-ten-orcin.vercel.app";
  const navigate = useNavigate();

  const getStoredTokens = () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!tokens || !tokens.access) return null;
      return tokens;
    } catch {
      return null;
    }
  };

  const getDecodedUser = (tokens) => {
    try {
      return tokens && tokens.access ? jwt_decode(tokens.access) : null;
    } catch {
      return null;
    }
  };

  const [authTokens, setAuthTokens] = useState(getStoredTokens);
  const [user, setUser] = useState(() => getDecodedUser(getStoredTokens()));
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwt_decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${baseurl}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        return true;
      } else {
        logoutUser();
        return false;
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      logoutUser();
      return false;
    }
  };

  const loginUser = async (email, password) => {
    const response = await fetch(`${baseurl}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
      swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 4000,
        position: "top-right",
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } else {
      swal.fire({
        title: "Invalid Credentials",
        icon: "error",
        toast: true,
        timer: 4000,
        position: "top-right",
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  const registerUser = async (email, username, password, password2) => {
    const response = await fetch(`${baseurl}/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, password2 }),
    });

    if (response.status === 201) {
      navigate("/login");
      swal.fire({
        title: "Registration Successful. Please login!",
        icon: "success",
        toast: true,
        timer: 4000,
        position: "top-right",
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } else {
      const errorData = await response.json();
      swal.fire({
        title: "Registration Failed",
        text: JSON.stringify(errorData),
        icon: "error",
        toast: true,
        timer: 4000,
        position: "top-right",
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
    swal.fire({
      title: "Logged out",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  const updateUserProfile = async (user_id, formData) => {
    try {
      if (isTokenExpired(authTokens?.access)) {
        const refreshed = await refreshToken();
        if (!refreshed) throw new Error("Token refresh failed");
      }

      const token = authTokens?.access;

      const response = await fetch(`${baseurl}/api/profile/${user_id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Update failed:", text);
      } else {
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  useEffect(() => {
    const tokens = getStoredTokens();
    if (tokens) {
      setAuthTokens(tokens);
      setUser(getDecodedUser(tokens));
    }
    setLoading(false);
  }, []);

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
