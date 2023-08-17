"use server";
import Event from "@models/events";
import { connectToBD } from "@utils/database";

export async function fetchEventsFromServer(token) {
  const res = await fetch(
    `https://app.eventmaker.io/api/v1/events.json?per_page=20&auth_token=${token}`
  );
  const events = await res.json();
  return events;
}

export async function fetchEventsDetailsFromServer({ token, eventId }) {
  // Récupérer les détails de l'événement depuis Eventmaker
  const res = await fetch(
    `https://app.eventmaker.io/api/v1/events/${eventId}.json?auth_token=${token}`
  );
  const eventsDetailsFromEventmaker = await res.json();

  // Connecter à la base de données
  await connectToBD();

  // Vérifier si l'événement existe dans votre base de données
  let existingEvent = await Event.findById(eventId);

  existingEvent = JSON.parse(JSON.stringify(existingEvent));

  if (existingEvent) {
    // Si le titre est différent, mettre à jour le titre dans votre base de données

    existingEvent.title = eventsDetailsFromEventmaker.title;
    existingEvent.organizer = eventsDetailsFromEventmaker.organizer;
    existingEvent.start_date = eventsDetailsFromEventmaker.start_date;
    existingEvent.end_date = eventsDetailsFromEventmaker.end_date;

    await Event.findByIdAndUpdate(eventId, existingEvent);
  }

  // Retourner l'objet avec les informations à jour
  return existingEvent ? existingEvent : eventsDetailsFromEventmaker;
}
export async function fetchRequestDetailsFromServer({ eventId, requestId }) {
  // Connecter à la base de données
  await connectToBD();
  // Vérifier si l'événement existe dans votre base de données
  let existingEvent = await Event.findById(eventId);

  existingEvent = JSON.parse(JSON.stringify(existingEvent));
  if (!existingEvent) {
    // Gérer l'erreur si l'événement n'existe pas
    return new Error("Event not found");
  }

  // Trouver la demande correspondante dans l'événement
  const request = existingEvent.requests.find(
    (req) => req._id.toString() === requestId
  );

  if (!request) {
    // Gérer l'erreur si la demande n'existe pas
    return new Error('Request not found');
  }

  return request;
}
