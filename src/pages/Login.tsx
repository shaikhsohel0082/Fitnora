import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Admin Login
    if (username === "admin" && password === "admin750") {
      localStorage.setItem("bill_auth", "admin");
      navigate("/bill");
      return;
    }

    // ✅ Super Admin Login
    if (username === "superadmin" && password === "superadmin750") {
      localStorage.setItem("bill_auth", "superadmin");
      navigate("/superadmin/customers");
      return;
    }

    alert("Invalid Username or Password");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.logo}>Fitnora</h2>

        <form onSubmit={handleSubmit}>
          <label className={styles.inputLabel}>User ID</label>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Please enter user id"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className={styles.inputLabel}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.inputField}
              type={showPassword ? "text" : "password"}
              placeholder="Please enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;