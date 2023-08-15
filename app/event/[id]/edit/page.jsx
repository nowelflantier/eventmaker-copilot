"use client";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEvent } from "@utils/EventContext";
import FormEventEdit from "@components/FormEventEdit";

const EditEventPage = () => {
  const { user } = useUser();
  const { event, setEvent } = useEvent();
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  console.log({user,event,session, params});
  
  const fetchEventDetails = async () => {
    const token = user.token;
    const eventId = params.id;
    const fetchedEventDetails = await fetchEventsDetailsFromServer({
      token,
      eventId,
    });
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
    {!event && user && fetchEventDetails()}
  
  }, [event])
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Envoyer les données du formulaire à votre API pour créer l'événement
    // const response = await fetch('/api/events', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // if (response.ok) {
    //   // Rediriger vers la page de l'événement ou une autre page si l'événement est créé avec succès
    //   router.push('/event/success');
    // }
  };
  return (
    <section className="w-full">
    <h1 className="head_text text-left">
      Dites-en plus sur le <span className="green_gradient">{event?.title}</span>
    </h1>
    <p className="desc text-left">
      Donnez nous quelques informations complémentaires sur votre évènement pour générer les meilleurs contenus possibles pour votre évènement grâce à Eventmaker Copilot.
    </p>
   <FormEventEdit type='Générer mon contenu !' event={event} handleChange={handleChange} handleSubmit={handleSubmit} setEvent={setEvent}/></section>
  );
};

export default EditEventPage;

