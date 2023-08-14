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
  console.log("Request body:", req.body); // Imprimer la requête
  const { token } = await req.json();
  console.log("Token:", token); // Imprimer le token

  try {
    await connectToBD();
    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });
    user.token = token;
    user.markModified('token');
    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to update token", { status: 500 });
  }
};
