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
  // const { data: user } = useGetUserQuery("705c");
  // const [editUser] = useEditUserMutation();
  // console.log(users);
  // console.log(user);

  // const newUser = {
	// 	id:"705c",
  //   name: "بهراد رئوفی",
  //   password: "12345678",
  //   phone: "09111111111",
  //   email: "aaa@fd.vf",
  //   image: "/aseman-hotel/images/users/1.png",
  //   role: "admin",
  //   token:
  //     "eyJhbGciOiAibm9uZSIsICJ0eXAiOiAiSldUIn0KeyJ1c2VybmFtZSI6ImFkbWluaW5pc3RyYXRv",
  // };

	// const bbb = ()=> {

	// 	editUser({...newUser, token:"eyJhbGciOiAibm9uZSIsICJ0eXAiOiAiSldUIn0KeyJ1c2VybmFtZSI6ImFkbWluaW5pc3RyYXRv"});
	// }
  // if (userInfo) {

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
          {/* <CartInfo />  */}
        </div>
      </div>
    </header>
  );
}
