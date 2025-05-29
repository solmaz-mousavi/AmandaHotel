import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { StaticDataContext } from "../../context/StaticContext";
import "./adminPanel.scss";

export default function AdminPanel() {
  const { staticData } = useContext(StaticDataContext);
  return (
    <div className="adminPanel-wrapper">
      <div className="adminPanel-sidebar">
        <Link to="/amandaHotel/" className="adminPanel-navbar">صفحه اصلی</Link>
        <NavLink to="/amandaHotel/adminPanel/" className={(link) =>
                link.isActive ? "adminPanel-navbar active" : "adminPanel-navbar"
              }>داشبورد</NavLink>

        {staticData?.adminPanelNavbar &&
          staticData.adminPanelNavbar.map((item) => (
            <NavLink
              to={item.route}
              key={item.id}
              className={(link) =>
                link.isActive ? "adminPanel-navbar active" : "adminPanel-navbar"
              }
            >
              {item.title}
            </NavLink>
          ))}
      </div>
      <div className="adminPanel-main">
        <Outlet />
      </div>
    </div>
  );
}
