import React from "react";
import styles from "./Layout.module.css";

const Footer = () => {
  return <footer className={styles.footer}>© {new Date().getFullYear()} Fitnora</footer>;
};

export default Footer;
