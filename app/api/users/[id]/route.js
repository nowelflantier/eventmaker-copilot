import { connectToBD } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToBD();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts from database", {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  const { token } = await req.json();
  try {
    await connectToBD();
    const user = await User.findById(params.id);
    console.log(user);

    if (!user) return new Response("User not found", { status: 404 });
    user.token = token;

    await user.save();
    console.log(user);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to update token", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToBD();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
