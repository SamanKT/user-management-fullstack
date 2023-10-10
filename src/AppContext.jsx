import React, { createContext, useEffect, useState } from "react";
import { api } from "./configs/Configs";

export const appContext = createContext();

const AppContext = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = () => {
    api.get("/users").then((res) => {
      setAllUsers(res.data);
    });
  };

  const refreshUserList = () => {
    getAllUsers();
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const { Provider } = appContext;

  return <Provider value={{ allUsers, refreshUserList }}>{children}</Provider>;
};

export default AppContext;
