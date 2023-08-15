"use client";
import EventDetailledView from "@components/EventDetailledView";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { fetchEventsDetailsFromServer } from "@components/FetchEvents";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const EventPage = () => {
  const { user } = useUser();
  const params = useParams();
  const [eventsDetails, setEventsDetails] = useState()
  const eventId = params.id
  const fetchEventDetails = async () => {
    const token = user.token;
    const fetchedEventDetails = await fetchEventsDetailsFromServer({token, eventId});
    const fetchedUserResponse = await fetch(`/api/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });
    const fetchedUser = await fetchedUserResponse.json();
    console.log(fetchedEventDetails);
    setEventsDetails(fetchedEventDetails)
  };

  useEffect(() => {
    {
      user && fetchEventDetails();
    }
  }, [user]);
  return <EventDetailledView event={eventsDetails} />;
};

export default EventPage;
