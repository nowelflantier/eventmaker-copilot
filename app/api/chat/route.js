import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export const POST = async (req) => {
  // console.log(req);
  const {system, user, assistant, concatPrompt, messages} =
    await req.json();
  // console.log({concatPrompt, system, user, assistant});
  console.log(messages);
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages:messages,
    // messages: [
    //   {
    //     role: "system",
    //     content: `${system}`,
    //   },
    //   {
    //     "role": "user",
    //     "content": `${user}`
    //   },
    //   {
    //     "role": "assistant",
    //     "content": `${assistant}`
    //   },
    //   {
    //     role: "user",
    //     // content: `Le/la ${type_of_event} intitulé "${title}" organisé par ${organizer} est un évènement à destination d'un public ${public_type} et qui aura lieu du ${start_date} au ${end_date}. Ses thématiques principales sont : ${thematics}. Je veux générer un/une ${type_of_content} pour mon ${support} dont l'objet est "${topic} " et qui est destiné aux ${target} avec un ton ${tone}.`,
    //     content: `${concatPrompt}`
    //   },
    // ],
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // console.log(stream);
  // console.log(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
};
