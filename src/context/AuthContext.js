import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const swal = require("sweetalert2");

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const baseurl = "https://chat-backend-ten-orcin.vercel.app";
  const navigate = useNavigate();

  // Safely retrieve and validate tokens from localStorage
  const getStoredTokens = () => {
    try {
      const stored = localStorage.getItem("authTokens");
      if (!stored) return null;

      const tokens = JSON.parse(stored);

      if (!tokens?.access || typeof tokens.access !== "string" || tokens.access.trim() === "") {
        throw new Error("Invalid access token format");
      }

      jwt_decode(tokens.access); // Validate token
      return tokens;
    } catch (error) {
      console.warn("Invalid token found in localStorage:", error.message);
      localStorage.removeItem("authTokens");
      return null;
    }
  };

  // Decode JWT token
  const getDecodedUser = (tokens) => {
    try {
      return tokens?.access ? jwt_decode(tokens.access) : null;
    } catch (error) {
      console.warn("Failed to decode user from token.");
      return null;
    }
  };

  const initialTokens = getStoredTokens();
  const initialUser = getDecodedUser(initialTokens);

  const [authTokens, setAuthTokens] = useState(initialTokens);
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  // Login function
  const loginUser = async (email, password) => {
    const response = await fetch(`${baseurl}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      try {
        const decoded = jwt_decode(data.access);
        setAuthTokens(data);
        setUser(decoded);
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
      } catch (error) {
        logoutUser();
      }
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

  // Register function
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

  // Logout function
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
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

  // ✅ Updated: Update user profile & context after PUT
  const updateUserProfile = async (user_id, formData) => {
    try {
      const token = authTokens?.access;

      // Step 1: Update profile via PUT
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
        console.log("✅ Profile updated successfully");

        // Step 2: Fetch updated profile
        const userResponse = await fetch(`${baseurl}/api/profile/${user_id}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.ok) {
          const updatedUser = await userResponse.json();
          setUser(updatedUser); // ✅ Update context
          console.log("✅ User context updated with latest profile.");
        } else {
          console.warn("⚠️ Failed to fetch updated user profile.");
        }
      }
    } catch (error) {
      console.error("❌ Update error:", error);
    }
  };

  // Restore session from localStorage on first load
  useEffect(() => {
    const tokens = getStoredTokens();
    const decodedUser = getDecodedUser(tokens);

    if (tokens && decodedUser) {
      setAuthTokens(tokens);
      setUser(decodedUser);
    } else {
      localStorage.removeItem("authTokens");
      setAuthTokens(null);
      setUser(null);
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
      {!loading && children}
    </AuthContext.Provider>
  );
};
