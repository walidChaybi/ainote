import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TipTapEditor from "@/components/TipTapEditor";

type Props = {
  params: { noteId: string };
};

export default async function NotebookPage({ params: { noteId } }: Props) {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

  const { firstName, lastName } = await clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));
  if (notes.length < 1) return redirect("/dashboard");

  const note = notes[0];

  return (
    <div className="min-h-screen grain p-8 ">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button size="sm" className="bg-teal-400">
              Back
            </Button>
          </Link>
          <h2 className="ml-4 font-semi-bold ">
            {firstName} {lastName}
          </h2>
          <span className="inline-block font-bold mx-1">/</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{note.name}</TooltipTrigger>
              <TooltipContent>
                <span className="text-teal-900 font-semibold">Note</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="ml-auto">Delete</div>
        </div>
        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full ">
          <TipTapEditor />
        </div>
      </div>
    </div>
  );
}
