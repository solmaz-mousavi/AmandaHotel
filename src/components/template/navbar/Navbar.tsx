import { useContext, useState } from "react";
import "./navbar.scss";
import { StaticDataContext } from "../../../context/StaticContext";
import { AuthContext } from "../../../context/AuthContext";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);

  return (
    <nav className="navbar-wrapper">
      <div className="container navbar-container">
        <MdOutlineMenu
          className="menu-icon"
          onClick={() => setShowNavbar((prev) => !prev)}
        />
        {staticData?.navbar &&
          staticData.navbar.map((item) => (
            <NavLink
              key={item.id}
              to={`/AmandaHotel/${item.route}`}
              className={(link) =>
                link.isActive ? "navbar-item active" : "navbar-item"
              }
              onClick={() => setShowNavbar(false)}
            >
              {item.title}
            </NavLink>
          ))}

        {userInfo && (
          <NavLink
            to="/AmandaHotel/orders"
            className={(link) =>
              link.isActive ? "navbar-item active" : "navbar-item"
            }
          >
            سفارشات
          </NavLink>
        )}
        {userInfo?.role === "admin" && (
          <NavLink
            to="/AmandaHotel/adminPanel"
            className={(link) =>
              link.isActive ? "navbar-item active" : "navbar-item"
            }
          >
            پنل مدیریتی
          </NavLink>
        )}
      </div>
    </nav>
  );
}
