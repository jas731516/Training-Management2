
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import loginImage from "./image/login-image.png";

function Email({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSignIn = () => {

    if (!email || !password) {
      alert("Email and Password are required ❗");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters 🔐");
      return;
    }

    alert("Login Successful ✅");
    onLoginSuccess();
    navigate("/Email"); // Go to Dashboard

  };
  return (
    <div className="email-page">
      <div className="email-left">
        <h1>Welcome back!</h1>
        <p>Please enter your credentials to sign in!</p>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
        </div>
        <button onClick={handleSignIn} className="signin-btn">
          Sign In
        </button>
        <div className="divider">or continue with</div>
        <GoogleLogin
          onSuccess={(response) => {
            console.log("Google Credential:", response);
            alert("Google Login Success ✅");
            onLoginSuccess();
            navigate("/Email");
          }}
          onError={() => alert("Google login failed ❌")}
          useOneTap={false}
        />
      </div>
      <div className="email-right">
        <img src={loginImage} alt="Login Illustration" />
      </div>
    </div>
  );
}

export default Email;
