import OpenAI from "openai";
// import { useEvent } from "./EventContext";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function OpenAIStream(payload) {
    // const {setGeneratedContent} = useEvent()
  try {
    const completion = await openai.chat.completions.create(payload);
    const chunks = [];
    for await (const chunk of completion) {
      chunks.push(chunk.choices[0].delta.content);
    console.log(chunks.join(''));
      
    }
    return chunks.join('');
  } catch (error) {
    console.log(error);
    throw error;
  }
}



// import { createParser } from "eventsource-parser";
// import OpenAI from "openai";

// const openai = new OpenAI();

// export async function OpenAIStream(payload) {
//   const encoder = new TextEncoder();
//   const decoder = new TextDecoder();

//   let counter = 0;
//   console.log("openaistream : ", payload);
//   let res
//   try {
//     // res = await fetch("https://api.openai.com/v1/chat/completions", {
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     //   },
//     // //   method: "POST",
//     //   body: JSON.stringify(payload),
//     // });
//     res = await openai.chat.completions.create(payload);
//     console.log("ressss:",res);
//     // if (!res.ok) {
//     //     // const errorBody = await res.text();
//     //     console.error('Error response body:', errorBody);
//     //     throw new Error('Bad request');
//     //   }
      
//   } catch (error) {
//     console.log(error);
//     throw error; // Vous pouvez choisir de gérer l'erreur différemment
//   }

// //   console.log(res);
//   const stream = new ReadableStream({
//     async start(controller) {
//       function onParse(event) {
//         if (event.type === "event") {
//           const data = event.data;
//           if (data === "[DONE]") {
//             controller.close();
//             return;
//           }
//           try {
//             const json = JSON.parse(data);
//             const text = json.choices[0].text;
//             if (counter < 2 && (text.match(/\n/) || []).length) {
//               return;
//             }
//             const queue = encoder.encode(text);
//             controller.enqueue(queue);
//             counter++;
//           } catch (e) {
//             controller.error(e);
//           }
//         }
//       }

//       // stream response (SSE) from OpenAI may be fragmented into multiple chunks
//       // this ensures we properly read chunks & invoke an event for each SSE event stream
//       const parser = createParser(onParse);
//       console.log("res 2 : ",res)
//       // https://web.dev/streams/#asynchronous-iteration
//       for await (const chunk of res.body) {
//         parser.feed(decoder.decode(chunk));
//       }
//     },
//   });
//   console.log("STREAM : ",stream);
//   return stream;
// }
