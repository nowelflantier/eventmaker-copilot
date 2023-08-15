import { connectToBD } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToBD();
    const user = await User.findById(params.id);
    if (!user) return new Response("user not found", { status: 404 });
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch user from database", {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { token, first_name, last_name, favoriteEvent, action } =
    await req.json();
  try {
    await connectToBD();
    const user = await User.findById(params.id);
    console.log("Événement favori:", favoriteEvent);

    console.log({ action, favoriteEvent });
    if (!user) return new Response("User not found", { status: 404 });
    // Assigner seulement si la valeur est définie
    if (token !== undefined) user.token = token;
    if (first_name !== undefined) user.first_name = first_name;
    if (last_name !== undefined) user.last_name = last_name;
    if (!user.favoriteEvents) {
      user.favoriteEvents = [];
    }
    if (action === "add") {
      // Vérifiez si l'événement est déjà dans les favoris
      const isAlreadyFavorite = user.favoriteEvents.some(
        (e) => e._id === favoriteEvent._id
      );
      // Si l'événement n'est pas déjà dans les favoris, ajoutez-le
      if (!isAlreadyFavorite) {
        user.favoriteEvents.push(favoriteEvent);
      } else {
        console.log("Événement déjà dans les favoris");
      }
    } else if (action === "remove") {
      user.favoriteEvents = user.favoriteEvents.filter(
        (e) => e._id !== favoriteEvent._id
      );
    }
    user.markModified("favoriteEvents");
    user.markModified("token");
    user.markModified("first_name");
    user.markModified("last_name");

    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return new Response("Failed to update token", { status: 500 });
  }
};
