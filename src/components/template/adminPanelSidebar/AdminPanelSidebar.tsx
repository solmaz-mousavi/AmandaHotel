import { Link, NavLink } from "react-router-dom";
import "./adminPanelSidebar.scss";
import { useContext } from "react";
import { StaticDataContext } from "../../../context/StaticContext";

export default function AdminPanelSidebar() {
		const { staticData } = useContext(StaticDataContext);
	return (
		<div className="adminPanel-sidebar">
		<Link to="/amandaHotel/" className="adminPanel-navbar">صفحه اصلی</Link>
		<NavLink to="/amandaHotel/adminPanel/dashboard" className={(link) =>
						link.isActive ? "adminPanel-navbar active" : "adminPanel-navbar"
					}>داشبورد</NavLink>

		{staticData?.adminPanelNavbar &&
			staticData.adminPanelNavbar.map((item) => (
				<NavLink
					to={`/amandaHotel/adminPanel/${item.route}`}
					key={item.id}
					className={(link) =>
						link.isActive ? "adminPanel-navbar active" : "adminPanel-navbar"
					}
				>
					{item.title}
				</NavLink>
			))}
	</div>
	)
}
