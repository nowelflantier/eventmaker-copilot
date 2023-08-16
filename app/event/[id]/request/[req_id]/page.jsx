"use client";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { fetchEventsDetailsFromServer } from "@components/FetchEvents";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEvent } from "@utils/EventContext";
import RequestDetailedView from "@components/RequestDetailledView";

const RequestPage = () => {
  const { user, setCurrentEventId } = useUser();
  const { data: session } = useSession();
  const {event, setEvent} = useEvent()
  const router = useRouter();
  const [isEventLoaded, setIsEventLoaded] = useState(false);
  const params = useParams();
  const [requestDetails, setRequestDetails] = useState();
  const [eventDetails, setEventDetails] = useState()
  const eventId = params.id;
  const requestId = params.req_id;
  
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
    setEventDetails(fetchedEventDetails);
    console.log(fetchedEventDetails);
    setIsEventLoaded(true);
 
    setEvent(fetchedEventDetails)
  };
  useEffect(() => {
    {
      // !session ? router.push("/") : setCurrentEventId(eventId);
    }
  }, []);
  useEffect(() => {
    {
      user && fetchEventDetails();
    }
  }, [user]);

  return (
    <RequestDetailedView requestId={requestId} event={event} />
  )
}

export default RequestPage