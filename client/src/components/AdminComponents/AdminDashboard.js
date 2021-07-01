import React from "react";
import AdminSideBar from "./AdminSideBar";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminSideBar />
      <h2>Admin Dashboard</h2>
    </div>
  );
}

export default AdminDashboard;
