import React, { useState } from "react";
import { createContext } from "react";
import { UserDataType } from "../dataTypes/Data.type";
import { useNavigate } from "react-router-dom";

type AuthContextPropsType = {
  token: string | null;
  setToken: (token: string | null) => void;
  userInfo: UserDataType | null;
  setUserInfo: (userInfo: UserDataType | null) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextPropsType>(
  {} as AuthContextPropsType
);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserDataType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const logout = () => {
    setUserInfo(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/AmandaHotel");
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, setUserInfo, token, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
