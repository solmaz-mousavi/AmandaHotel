import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { StaticDataContext } from "../../context/StaticContext";
import "./adminPanel.scss";
import AdminPanelSidebar from "../../components/template/adminPanelSidebar/AdminPanelSidebar";

export default function AdminPanel() {

  return (
    <div className="adminPanel-wrapper">
<AdminPanelSidebar />
      <div className="adminPanel-main">
        <Outlet />
      </div>
    </div>
  );
}
