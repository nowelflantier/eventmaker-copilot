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
// export async function fetchEventsCategoriesFromServer({token, eventId}) {
//   const res = await fetch(
//     `https://app.eventmaker.io/api/v1/events/${eventId}/guest_categories.json?auth_token=${token}`
//   );
//   const events = await res.json();
//   return events;
// }

export async function fetchEventsCategoriesFromServer({ token, eventId }) {
  // Récupérer les catégories depuis Eventmaker
  const res = await fetch(
    `https://app.eventmaker.io/api/v1/events/${eventId}/guest_categories.json?auth_token=${token}`
  );
  const eventmakerCategories = await res.json();

  // Connecter à la base de données (si nécessaire)
  await connectToBD();

  // Récupérer les catégories existantes depuis votre base de données
  // let existingCategories = await Category.find({ eventId: eventId });
  let existingEvent = await Event.findById(eventId);

  // Créer un objet contenant toutes les catégories de la BDD
  let mergedCategories;

  if (existingEvent && existingEvent.categories.length > 0) {
    mergedCategories = existingEvent.categories.map((category) => {
      const eventmakerCategory = eventmakerCategories.find(
        (emCategory) => emCategory._id === category.id
      );
  
      return {
        id: category.id,
        name: eventmakerCategory ? eventmakerCategory.name : category.name,
        population: eventmakerCategory
          ? eventmakerCategory.population_type
          : category.population,
        selected: category.selected,
      };
    });
  } else {
    // Si le tableau de catégories de la BDD est vide, utilisez simplement les données d'Eventmaker
    mergedCategories = eventmakerCategories.map((category) => ({
      id: category._id,
      name: category.name,
      population: category.population_type,
      selected: false, // Vous pouvez définir une valeur par défaut ici si nécessaire
    }));
  }  
  
  console.log(mergedCategories);
  // Retourner l'objet fusionné
  return mergedCategories;
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
