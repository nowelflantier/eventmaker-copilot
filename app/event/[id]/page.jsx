"use client";
import EventDetailledView from "@components/EventDetailledView";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { fetchEventsDetailsFromServer } from "@components/FetchEvents";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEvent } from "@utils/EventContext";

const EventPage = () => {
  const { user, setCurrentEventId } = useUser();
  const { data: session } = useSession();
  const {event, setEvent} = useEvent()
  const router = useRouter();
  const [isEventLoaded, setIsEventLoaded] = useState(false);
  const params = useParams();
  const [eventsDetails, setEventsDetails] = useState();
  const eventId = params.id;
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
    console.log(fetchedEventDetails);
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
    setEvent(eventDetailsToStore)
  };

  useEffect(() => {
    {
      !session ? router.push("/") : setCurrentEventId(eventId);
    }
  
    
  }, []);
  useEffect(() => {
    {
      user && fetchEventDetails();
    }
  }, [user]);
  return (
    <EventDetailledView event={eventsDetails} isEventLoaded={isEventLoaded} />
  );
};

export default EventPage;
