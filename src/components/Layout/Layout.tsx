import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.pageContent}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;