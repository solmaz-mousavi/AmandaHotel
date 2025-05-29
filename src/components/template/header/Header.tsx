import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  useGetUsersQuery,
} from "../../../app/services/userApi";
import Logo from "../../module/logo/Logo";
import Social from "../../global/social/Social";
import "./header.scss";
import HeaderUserInfo from "../../module/headerUserInfo/HeaderUserInfo";

export default function Header() {
  const { userInfo, logout, setUserInfo, setToken } = useContext(AuthContext);
  const tokenID = localStorage.getItem("token");
  const { data: users } = useGetUsersQuery();

	useEffect(() => {
  const user = users?.find((i) => i.token === tokenID);
  if(user){
		setUserInfo(user);
		setToken(user.token);
	}

  }, [users, tokenID, setUserInfo, setToken]);

  return (
    <header className="header-wrapper">
      <div className="container header-container" >
        <div className="header-right">
          <Logo />
          <Social />
        </div>
      
        <div className="header-left">
           <HeaderUserInfo userInfo={userInfo} logout={logout} />
        </div>
      </div>
    </header>
  );
}
