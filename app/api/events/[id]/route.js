import { connectToBD } from "@utils/database";
import Event from "@models/events";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToBD();
    const event = await Event.findById(params.id);
    if (!event) return new Response("event not found", { status: 404 });
    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch event from database", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToBD();
    const eventData = await req.json();
    const newEvent = new Event({
      _id: new mongoose.Types.ObjectId(),
      ...eventData,
    });
    await newEvent.save();
    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    return new Response("Failed to create event", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToBD();
    const eventData = await req.json();
    let existingEvent = await Event.findById(params.id);

    if (!existingEvent) {
      return new Response("Event not found", { status: 404 });
    }

    // Mettre à jour les champs si définis
    Object.keys(eventData).forEach((key) => {
      existingEvent[key] = eventData[key];
    });

    await existingEvent.save();
    return new Response(JSON.stringify(existingEvent), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'évènement:", error);
    return new Response("Failed to update event", { status: 500 });
  }
};

