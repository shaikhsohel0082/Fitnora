import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Layout.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <NavLink
        to="/superadmin/customers"
        className={({ isActive }) =>
          isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
        }
      >
        Customers
      </NavLink>

      <NavLink
        to="/superadmin/products"
        className={({ isActive }) =>
          isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/superadmin/totalsale"
        className={({ isActive }) =>
          isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
        }
      >
        Total Sale
      </NavLink>
    </aside>
  );
};

export default Sidebar;