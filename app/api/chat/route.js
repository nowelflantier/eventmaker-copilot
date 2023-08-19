import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ta } from "date-fns/locale";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export const POST = async (req) => {
  // console.log(req);
  const { concatPrompt, target, public_type, type_of_content, support, topic } =
    await req.json();
  console.log("current message api", concatPrompt);
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `Tu es Eventmaker Copilot, tu aides les organisateurs d'évènements qui utilisent la plateforme Eventmaker à optimiser la gestion de leur évènement et leur facilitent la tâche en leur proposant du contenu pertinent pour les sites web et emails.\n\nEventmaker leur permet notamment de créer la vitrine de leur évènement sur le web, des formulaires d'inscription, des emails et propose des fonctionnalités de networking.\n\nTu vas recevoir les informations de l'évènement concerné ainsi qu'une requete plus spécifique.\nRetourne une structure ou du contenu texte pertinents selon ton analyse de leur domaine d'activité, le type d'évènement et le public ciblé et la demande de la request.\n\nIntègre dans ta réponse des thématiques annexes et complémentaires pour les utilisateurs et le SEO.`,
      },
      {
        role: "user",
        //  content: `intitulé est un évènement. Je veux générer un/une ${target} pour mon ${target} dont l'objet est "${target} et qui est destiné aux ${target} avec un ton ${target}.`,
        content: `${concatPrompt}`,
      },
    ],
    temperature: 1,
    max_tokens: 900,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
};
