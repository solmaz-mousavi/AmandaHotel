import { Outlet } from "react-router-dom";
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
