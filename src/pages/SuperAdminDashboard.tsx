import React from "react";
import Layout from "../components/Layout/Layout";

const SuperAdminDashboard = () => {
  return (
    <Layout>
      <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center ">
        <h2 className="fs-1">Welcome Super Admin</h2>
        <p className="fs-4">Select an option from the sidebar.</p>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
