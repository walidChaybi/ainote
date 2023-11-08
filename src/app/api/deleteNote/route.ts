import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { noteId } = body;
  console.log(noteId);

  await db.delete($notes).where(eq($notes.id, noteId));

  return new NextResponse("ok", {
    status: 200,
  });
}
