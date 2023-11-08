import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { request } from "http";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();

    const note = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));
    if (!note[0].imageUrl) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const firebase_url = await uploadFileToFirebase(
      note[0].imageUrl,
      note[0].name
    );
    await db
      .update($notes)
      .set({
        imageUrl: firebase_url,
      })
      .where(eq($notes.id, parseInt(noteId)));
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
