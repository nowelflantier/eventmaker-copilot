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
    return false;
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


// import { connectToBD } from "@utils/database";
// import Event from "@models/events";
// import mongoose from "mongoose";

// export const GET = async (req, { params }) => {
//   try {
//     await connectToBD();
//     const event = await Event.findById(params.id);
//     if (!event) return new Response("event not found", { status: 404 });
//     return new Response(JSON.stringify(event), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response("Failed to fetch event from database", {
//       status: 500,
//     });
//   }
// };

// export const PATCH = async (req, { params }) => {
//   const { event } = await req.json();

//   if (req.method === "PATCH") {
//     try {
//       await connectToBD();
//       let existingEventData = await Event.findById(params._id);
//       console.log("Événement trouvé :", existingEventData);
//       //   console.log(req);

//       if (!existingEventData) {
//         console.log(req.body);
//         // Si l'événement n'existe pas, créez un nouvel événement
//         const newEventData = {
//           _id: new mongoose.Types.ObjectId(),
//           ...req.body,
//         };
//         existingEventData = new Event(newEventData);
//         await existingEventData.save();
//         console.log("new", existingEventData);
//       } else {
//         // Assigner seulement si la valeur est définie
//         if (title !== undefined) existingEventData.title = title;
//         if (_id !== undefined) existingEventData.id = _id;
//         if (website_domain_name !== undefined)
//           existingEventData.website_domain_name = website_domain_name;
//         if (start_date !== undefined) existingEventData.start_date = start_date;
//         if (end_date !== undefined) evexistingEventDataent.end_date = end_date;
//         if (type_of_content !== undefined)
//           evexistingEventDataent.type_of_content = type_of_content;
//         if (type_of_event !== undefined) existingEventData.type_of_event = type_of_event;
//         if (thematics !== undefined) existingEventData.thematics = thematics;
//         console.log("update", existingEventData);
//       }
//       existingEventData.markModified("website_domain_name");
//       existingEventData.markModified("title");
//       existingEventData.markModified("start_date");
//       existingEventData.markModified("end_date");
//       existingEventData.markModified("type_of_content");
//       existingEventData.markModified("type_of_event");
//       existingEventData.markModified("thematics");
//       await existingEventData.save();
//       return new Response(JSON.stringify(existingEventData), { status: 200 });
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour de l'évènement:", error);
//       return new Response("Failed to update token", { status: 500 });
//     }
//   }
// };
