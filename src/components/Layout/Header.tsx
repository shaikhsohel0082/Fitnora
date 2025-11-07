import React from "react";
import styles from "./Layout.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("bill_auth");
    window.location.href = "/login";
  };
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <h1
        className={`${styles.logo} cursor-pointer`}
        onClick={() => {
          navigate("/");
        }}
      >
        Fitnora
      </h1>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
