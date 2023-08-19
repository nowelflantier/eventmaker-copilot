"use client";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEvent } from "@utils/EventContext";
import { fetchEventsDetailsFromServer } from "@components/FetchEvents";
import FormRequest from "@components/FormRequest";
import FormRequest2 from "@components/FormRequest2";

const NewRequestPage = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  
  const { event, setEvent } = useEvent();
  const { data: session } = useSession();
  // const [eventDetailsToStore, setEventDetailsToStore] = useState({});
  const router = useRouter();
  const params = useParams();
  const eventId = params.id;

  const fetchEventDetails = async () => {
    const token = user.token;

    const fetchedEventDetails = await fetchEventsDetailsFromServer({
      token,
      eventId,
    });
    
    setEvent(fetchedEventDetails);
  };

  useEffect(() => {
    {
      user && fetchEventDetails();
    }
  }, [user]);

  useEffect(() => {
    // console.log(event);
  }, [event])
  
 
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        Quel contenu créer pour le{" "}
        <span className="green_gradient">{event?.title}</span> ?
      </h1>
      <p className="desc text-left">
        Donnez nous quelques détails sur le contenu que vous souhaitez générer
        grâce à Eventmaker Copilot.
      </p>
      <FormRequest
        type="Générer mon contenu !"
        event={event}
        setEvent={setEvent}
      />
    </section>
  );
};

export default NewRequestPage;
