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
  // useEffect(() => {
  //   console.log(request);
  
  
  // }, [request])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Vérifier si l'événement existe
      const checkResponse = await fetch(`/api/events/${eventId}`, {
        method: "GET",
      });

      let response;
      if (checkResponse.ok) {
        console.log("rep ok", event);
        // Si l'événement existe, mettre à jour
        response = await fetch(`/api/events/${eventId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        });
      } else {
      
        console.log("rep new");
        // Si l'événement n'existe pas, créer
        response = await fetch(`/api/events/${eventId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        });
      }

      if (response.ok) {
        // Rediriger vers la page de l'événement ou une autre page si l'événement est créé/mis à jour avec succès
        router.push(`/event/${eventId}`);
        console.log(event);
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
  return new Response("Failed to create event", { status: 500 });
    } finally {
      setSubmitting(false);
    }
  };

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
