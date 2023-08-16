"use client";
import React, { createContext, useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "./UserContext";

const EventContext = createContext();

export const useEvent = () => {
  return useContext(EventContext);
};

const fetchEventData = async (eventId) => {
  try {
    const response = await fetch(`/api/events/${eventId}`, { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    return null;
  }
};

export const EventProvider = ({ children }) => {
//   const { data: session } = useSession();
  const [event, setEvent] = useState();
//   const {user, currentEventId } = useUser();

//   useEffect(() => {
//     if (currentEventId) {
//       setCurrentEvent(currentEventId);
//     }
//   }, [user]);

  

  const value = { event, setEvent };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
