import "./headerUserInfo.scss";
import { UserDataType } from "../../../dataTypes/Data.type";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function HeaderUserInfo({
  userInfo,
  logout,
}: {
  userInfo: UserDataType | null;
  logout: () => void;
}) {
  return (
    <>
      {userInfo ? (
        <div className="userInfo-container">
          <Link to="/AmandaHotel/userPanel/userInfo">
            {userInfo.image ? (
              <img
                src={userInfo.image}
                alt="profile"
                className="header-image"
              />
            ) : (
              <FaUserCircle className="header-image" />
            )}
          </Link>

          <div className="username-container">
            <Link to="/amandaHotel/userPanel/userInfo" className="username">{userInfo.name}</Link>
            <p className="username-role">
              {userInfo.role === "admin" ? "مدیر سایت" : "کاربر"}
            </p>
          </div>
					<div className="logout-wrapper" onClick={() => logout()}>

					<span>خروج</span>
          <MdLogout onClick={() => logout()} className="icon logout-icon" />
					</div>
        </div>
      ) : (
        <>
          <Link to="/AmandaHotel/login" className="icon header-icon">
            ورود
          </Link>
          <span className="header-devider"></span>
          <Link to="/AmandaHotel/register" className="icon header-icon">
            ثبت نام
          </Link>
        </>
      )}
    </>
  );
}
