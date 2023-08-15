"use client";
import React, { createContext, useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`,{method: 'GET'});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(null);
  const [first_name, setFirst_name] = useState(null)
  const [last_name, setLast_name] = useState(null)
  const [favoriteEvents, setFavoriteEvents] = useState([]);


  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData(session.user.id).then((userData) => {
        setUser(userData);
      });
    }
  }, [session]);
  

  const value = {
    userName: session?.user.name,
    user,
    id: session?.user.id,
    setUser,
    setToken,
    setLast_name,
    setFirst_name,
    events,
    setEvents,
    first_name,
    token,
    last_name,
    favoriteEvents,
    setFavoriteEvents,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
