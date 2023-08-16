import { connectToBD } from "@utils/database";
import Event from "@models/events";
import mongoose from "mongoose";

export const POST = async (req, { params }) => {
 
    try {
      await connectToBD();
      const resquestData = await req.json();
      const event = await Event.findById(params.id)
  
      if (!event) {
        return new Response("Event not found", { status: 404 });
      }
      // console.log(resquestData);
      // const { _id, ...requestWithoutId } = resquestData; // Supprimer le champ _id de requestData

      // Créer un nouvel objet prompt avec un ID unique
      const request = {
        req_id: new mongoose.Types.ObjectId(),
        ...resquestData,
      };
      // console.log(request);
      // Ajouter le prompt à l'événement
      event.requests.push(request);
  
      await event.save();
      return new Response(JSON.stringify(request), { status: 201 });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la requête", error);
      return new Response("Failed to add request", { status: 500 });
    }
  };