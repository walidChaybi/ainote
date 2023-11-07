import { Configuration, OpenAIApi } from "openai-edge";
import Replicate from "replicate";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// export async function generateImagePrompt(name: string) {
//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an creative and helpful AI assistance capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
//         },
//         {
//           role: "user",
//           content: `Please generate a thumbnail description for my notebook titles ${name}`,
//         },
//       ],
//     });
//     const data = await response.json();

//     const image_description = data.choices[0].message.content;
//     console.log(image_description);
//     return image_description as string;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function generateImage(name: string) {
  try {
    const response = await openai.createImage({
      prompt: ` minimalistic and flat styled colorful emoji of ${name}`,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
