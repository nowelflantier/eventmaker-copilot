"use client";
import React, { createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const value = {
    user: session?.user.name,
    id: session?.user.id,
    token: null, // Vous pouvez définir le token ici si nécessaire
    setUser,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
