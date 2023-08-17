"use client";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEvent } from "@utils/EventContext";
import FormRequest from "@components/FormRequest";
import { fetchEventsDetailsFromServer, fetchRequestDetailsFromServer } from "@components/FetchEvents";

const EditRequestPage = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { event, setEvent, setRequest, request } = useEvent();
  
  const { data: session } = useSession();
  const [eventDetailsToStore, setEventDetailsToStore] = useState({});
  const router = useRouter();
  const params = useParams();
  const eventId = params.id;
  const requestId = params.req_id;

  const fetchEventDetails = async () => {
    const token = user.token;

    const fetchedEventDetails = await fetchEventsDetailsFromServer({
      token,
      eventId,
    });
    const eventData = {
      title: fetchedEventDetails.title,
      id: fetchedEventDetails._id,
      start_date: fetchedEventDetails.start_date,
      end_date: fetchedEventDetails.end_date,
      organizer: fetchedEventDetails.organizer,
      type_of_event: fetchedEventDetails.type_of_event,
      public_type: fetchedEventDetails.public_type,
      thematics: fetchedEventDetails.thematics,
      requests: fetchedEventDetails.requests,
    };
    // console.log(fetchedEventDetails);
    setEvent(eventData);
    const fetchedRequestDetails = await fetchRequestDetailsFromServer({eventId, requestId})
    setRequest(fetchedRequestDetails)
  };

  useEffect(() => {
    {
      user && fetchEventDetails();
    }
  }, [user]);
  useEffect(() => {
    console.log(request);
  
  
  }, [request])
  

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        Modifiez votre contenu pour le{" "}
        <span className="green_gradient">{event?.title}</span>
      </h1>
      <p className="desc text-left">
      Donnez nous quelques détails sur le contenu que vous souhaitez générer
        grâce à Eventmaker Copilot.
      </p>
      <FormRequest
        type="Mettre à jour"
        event={event}
        submitting={submitting}
        currentRequest={request}
        setEvent={setEvent}
      />
    </section>
  );
};

export default EditRequestPage;
