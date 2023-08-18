import { OpenAIStream } from "@utils/OpenAIstream";
import { NextResponse } from 'next/server'


export const runtime = 'edge'


export const POST = async (req, res) => {
  const { prompt } = await req.json();
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 100,
    stream: true,
    n: 1,
  };

  const result = await OpenAIStream(payload);
  console.log('resssss :',result);
  return NextResponse.json({ result })

  // return new Response(JSON.stringify(result), { status: 200 });
  
//   res.status(200).send(result);
};


// import OpenAI from "openai";
// import { OpenAIStream } from "@utils/OpenAIstream";

// const openai = new OpenAI(process.env.OPENAI_API_KEY);

// export const config = {
//   runtime: "edge",
// };

// export const POST = async (req) => {
//   const { prompt } = await req.json();
// //   console.log("req : ", req);
// //   console.log("route.js", prompt);
//     const payload = {
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "system", content: "You are a helpful assistant." },
//             { role: "user", content: prompt },
//           ],
//         temperature: 0.7,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//         max_tokens: 200,
//         stream: true,
//         n: 1,
//       };

//     // const completion = await openai.chat.completions.create({
//     //   model: "gpt-3.5-turbo",
//     //   messages: [
//     //     { role: "system", content: "You are a helpful assistant." },
//     //     { role: "user", content: generatedPrompt },
//     //   ],
//     //   stream: true,
//     // });

//     // const chunks = [];
//     // for await (const chunk of completion) {
//     //   chunks.push(chunk.choices[0].delta.content);
//     // }
//     const stream = await OpenAIStream(payload);
//     const reader = stream.getReader();
//     let result = '';
  
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
//       result += new TextDecoder().decode(value);
//     }
  
//     // res.status(200).send(result);
//     // return res.status(200).send(stream);

//     return new Response(JSON.stringify(result), { status: 200 });
  
// };
