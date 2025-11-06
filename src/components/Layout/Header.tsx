import React from "react";
import styles from "./Layout.module.css";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("bill_auth");
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Fitnora</h1>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
