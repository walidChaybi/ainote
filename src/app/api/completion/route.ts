import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI embedded in a text editor application. The traits of AI include expert knowledge, helpfulness, cleverness. AI is a well behaved and well-mannered individual. AI is always friendly, kind and inspiring, and is eager to provide helpful suggestions to the user",
      },
      {
        role: "user",
        content: `
        I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here: ##${prompt}##
        keep the tone of the text consistent with the rest of the text.
        keep the response short .
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
