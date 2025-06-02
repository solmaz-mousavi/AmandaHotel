import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function PrivateRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { userInfo } = useContext(AuthContext);
	if(!userInfo){
		return <>در حال بارگذاری اطلاعات کاربر</>
	}
  return (
    <>
      {userInfo && userInfo.role === "admin" ? (
        <>{children}</>
      ) : (
        <Navigate to="/amandaHotel/" />
      )}
    </>
  );
}
