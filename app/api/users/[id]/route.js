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
  const { token, first_name, last_name } = await req.json();
  try {
    await connectToBD();
    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });
    user.token = token;
    user.first_name = first_name;
    user.last_name = last_name;
    user.markModified("token");
    user.markModified("first_name");
    user.markModified("last_name");

    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to update token", { status: 500 });
  }
};
