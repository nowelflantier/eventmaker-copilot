"use client";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEvent } from "@utils/EventContext";

import { fetchEventsDetailsFromServer } from "@components/FetchEvents";
import FormRequest from "@components/FormRequest";

const RequestPage = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { event, setEvent } = useEvent();
  const { data: session } = useSession();
  const [eventDetailsToStore, setEventDetailsToStore] = useState({})
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
        console.log("rep new", event);
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
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        Dites-en plus sur le{" "}
        <span className="green_gradient">{event?.title}</span>
      </h1>
      <p className="desc text-left">
        Donnez nous quelques informations complémentaires sur votre évènement
        pour générer les meilleurs contenus possibles pour votre évènement grâce
        à Eventmaker Copilot.
      </p>
      <FormRequest
        type="Générer mon contenu !"
        event={event}
        submitting={submitting}
        handleSubmit={handleSubmit}
        setEvent={setEvent}
      />
    </section>
  );
};

export default RequestPage;
