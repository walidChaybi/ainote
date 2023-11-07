import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { name } = body;

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const imageUrl = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          width: 512,
          height: 512,
          prompt: `minimalistic colorful of ${name}`,
          refine: "expert_ensemble_refiner",
          scheduler: "KarrasDPM",
          num_outputs: 1,
          guidance_scale: 7.5,
          high_noise_frac: 0.8,
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      }
    );

    const note_ids = await db
      .insert($notes)
      .values({
        name,
        userId,
        imageUrl: imageUrl[0],
      })
      .returning({
        insertdId: $notes.id,
      });

    return NextResponse.json({
      note_id: note_ids[0].insertdId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
