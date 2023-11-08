import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { noteId, editorState } = body;
    if (!editorState || !noteId) {
      throw new NextResponse("Missing required fields");
    }

    noteId = parseInt(noteId);

    const notes = await db.select().from($notes).where(eq($notes.id, noteId));

    if (notes.length === 0) {
      throw new NextResponse("Note not found");
    }

    const note = notes[0];
    if (note.editorState !== editorState) {
      await db
        .update($notes)
        .set({
          editorState,
        })
        .where(eq($notes.id, noteId));
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
}
