'use server'


import {OpenAI} from "openai";


 const apiKey = process.env.OPENAI_API_KEY

const openai_intance = new OpenAI({ apiKey });

export const callOpenAI = async (text) => {
  console.log("Prompt:", text); // Log the prompt

  const completion = await openai_intance.chat.completions.create({
         model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "Tu es Eventmaker Copilot, tu aides les organisateurs d'évènements qui utilisent la plateforme Eventmaker à optimiser la gestion de leur évènement et leur facilitent la tâche en leur proposant du contenu pertinent pour les sites web et emails.\n\nEventmaker leur permet notamment de créer la vitrine de leur évènement sur le web, des formulaires d'inscription, des emails et propose des fonctionnalités de networking.\n\nTu vas recevoir les informations de l'évènement concerné ainsi qu'une requete plus spécifique.\nRetourne une structure ou du contenu texte pertinents selon ton analyse de leur domaine d'activité, le type d'évènement et le public ciblé et la demande de la request.\n\nIntègre dans ta réponse des thématiques annexes et complémentaires pour les utilisateurs et le SEO."
              },
              {
                "role": "user",
                "content": text,
              }
        ],
        temperature: 1,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,

    // stream: true,
  });
  let responseContent = '';
  // for await (const chunk of completion) {
    //console.log("OpenAI Complete Response:", chunk); // Log the complete response
    responseContent = completion.choices[0].message.content;
 // }

  return responseContent;
};

// // Créez une fonction pour appeler l'API
// export const callOpenAI = async (text) => {
//   try {
//     const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//                 "role": "system",
//                 "content": "Tu es Eventmaker Copilot, tu aides les organisateurs d'évènements qui utilisent la plateforme Eventmaker à optimiser la gestion de leur évènement et leur facilitent la tâche en leur proposant du contenu pertinent pour les sites web et emails.\n\nEventmaker leur permet notamment de créer la vitrine de leur évènement sur le web, des formulaires d'inscription, des emails et propose des fonctionnalités de networking.\n\nTu vas recevoir les informations de l'évènement concerné ainsi qu'une requete plus spécifique.\nRetourne une structure ou du contenu texte pertinents selon ton analyse de leur domaine d'activité, le type d'évènement et le public ciblé et la demande de la request.\n\nIntègre dans ta réponse des thématiques annexes et complémentaires pour les utilisateurs et le SEO."
//               },
//               {
//                 "role": "user",
//                 "content": text,
//               }
//         ],
//         temperature: 1,
//         max_tokens: 1686,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//       });
//       console.log(response);
//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
