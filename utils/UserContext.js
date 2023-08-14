"use client";
import React, { createContext, useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (session?.user.id) {
      // Récupérer le token depuis la base de données
      const fetchToken = async () => {
        const response = await fetch(`/api/users/${session.user.id}`,{
          method: "GET",});
        const data = await response.json();
        setToken(data.token);
      };

      fetchToken();
    }
  }, [session?.user.id]);
  const value = {
    user: session?.user.name,
    id: session?.user.id,
    token: session?.user.token, // Vous pouvez définir le token ici si nécessaire
    setUser,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
