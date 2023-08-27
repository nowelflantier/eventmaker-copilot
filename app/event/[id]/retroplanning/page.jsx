"use client";
import RetroplanningView from "@components/Retroplanning";
import { useUser } from "@utils/UserContext";
import { fetchEventsDetailsFromServer } from "@components/FetchEvents";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEvent } from "@utils/EventContext";

const RetroplanningPage = () => {
  const { event, setEvent } = useEvent();
  const [isEventLoaded, setIsEventLoaded] = useState(false);
  const params = useParams();
  const [eventsDetails, setEventsDetails] = useState();
  const eventId = params.id;
  const { user, setCurrentEventId } = useUser();
  const fetchEventDetails = async () => {
    const token = user.token;
    const fetchedEventDetails = await fetchEventsDetailsFromServer({
      token,
      eventId,
    });
    const fetchedUserResponse = await fetch(`/api/users/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fetchedUser = await fetchedUserResponse.json();
    setEventsDetails(fetchedEventDetails);
    setIsEventLoaded(true);
    const eventDetailsToStore = {
      title: fetchedEventDetails.title,
      _id: fetchedEventDetails._id,
      start_date: fetchedEventDetails.start_date,
      end_date: fetchedEventDetails.end_date,
      website_domain_name: fetchedEventDetails.website_domain_name,
      // Ajoutez ici d'autres propriétés si nécessaire
    };
    setEvent(eventDetailsToStore);
  };
  useEffect(() => {
    {
      user && fetchEventDetails();
    }
  }, [user]);

  return (
    // Dans le composant EventDetailledView
    <RetroplanningView event={eventsDetails} setEvent={setEvent} eventId={eventId}  />
  );
};

export default RetroplanningPage;
