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
  const {concatPrompt} =
    await req.json();
  console.log({concatPrompt});
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: "Tu es un assistant virtuel pour les organisateurs d'événements utilisant la plateforme Eventmaker. Ton rôle est de générer du contenu pertinent pour les sites web et emails, formaté en HTML, en fonction des informations de l'événement concerné et des demandes spécifiques. \n\n L'objectif est de fournir du contenu directement utilisable, sans introduction ni conversation. Les réponses doivent être rédigées comme si elles provenaient de l'organisateur de l'événement lui-même. \n\n Eventmaker permet aux organisateurs de créer la vitrine de leur événement sur le web, des formulaires d'inscription, des emails, et propose des fonctionnalités de networking. \n\n En fonction de l'analyse du domaine d'activité, du type d'événement, du public ciblé et de la demande spécifique, retourne du contenu texte pertinent et formaté en HTML. Ce contenu doit être prêt à être copié/collé directement dans un email ou sur le site, et affiché tel quel dans un navigateur web. \n\n Tu dois insérer directement des variables en respectant ce format, par exemple : {{guest.first_name}}, {{guest.last_name}}, {{event.title}} ",
      },
      {
        "role": "user",
        "content": "Le/la Salon intitulé \"Salon International des Inventions\" organisé par Palexpo est un évènement à destination d'un public B2B et qui aura lieu du 8 mars 2024 au 11 mars 2024. Ses thématiques principales sont : Innovation, Invention, International. Je veux générer un/une texte pour mon email dont l'objet est \"Confirmation \" et qui est destiné aux Visiteurs avec un ton Amical."
      },
      {
        "role": "assistant",
        "content": `<HTML>\n  <body>\n    <h2>Confirmation de votre inscription - Salon International des Inventions</h2>\n    <p>Bonjour {{guest.first_name}},</p>\n    \n    <p>Nous sommes ravis de vous confirmer votre inscription au Salon International des Inventions, organisé par Palexpo. Merci d'avoir choisi de participer à cet événement unique en son genre.</p>\n    \n    <p>Le salon se déroulera du <strong>8 mars 2024 au 11 mars 2024</strong>. Nous espérons que ces quatre jours seront un moment riche en rencontres, en découvertes et en opportunités.</p>\n    \n    <p>Cet événement, axé sur les thématiques de l'innovation, de l'invention et de l'international, réunit des exposants de renommée mondiale venant des quatre coins du globe. Vous aurez ainsi l'opportunité d'explorer les dernières tendances technologiques, de découvrir des inventions révolutionnaires et de rencontrer des entrepreneurs inspirants.</p>\n    \n    <p>Nous vous encourageons à consulter notre site`
      },
      {
        role: "user",
        // content: `Le/la ${type_of_event} intitulé "${title}" organisé par ${organizer} est un évènement à destination d'un public ${public_type} et qui aura lieu du ${start_date} au ${end_date}. Ses thématiques principales sont : ${thematics}. Je veux générer un/une ${type_of_content} pour mon ${support} dont l'objet est "${topic} " et qui est destiné aux ${target} avec un ton ${tone}.`,
        content: `${concatPrompt}`
      },
    ],
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
};
