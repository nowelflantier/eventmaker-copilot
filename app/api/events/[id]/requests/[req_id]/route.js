import { connectToBD } from "@utils/database";
import Event from "@models/events";
import mongoose from "mongoose";
  
export const PATCH = async (req, { params }) => {
    try {
      await connectToBD();
      const { eventId, requestId } = params;
      const requestData = await req.json();
      const event = await Event.findById(eventId)
  
      if (!event) {
        return new Response("Event not found", { status: 404 });
      }
  
      // Trouver le prompt correspondant dans l'événement
      const requestIndex = event.requests.findIndex((p) => p._id.toString() === requestId);
  
      if (requestIndex === -1) {
        return new Response("Request not found", { status: 404 });
      }
  
      // Mettre à jour les données du prompt
      event.requests[requestIndex] = { ...event.requests[requestIndex], ...requestData };
  
      await event.save();
      return new Response(JSON.stringify(event.requests[requestIndex]), { status: 200 });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la requête:", error);
      return new Response("Failed to update request", { status: 500 });
    }
  };
  