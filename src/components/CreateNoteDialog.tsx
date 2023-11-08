"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Loader2, PlusIcon } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function CreateNoteDialog() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // mutation to hit the create api /api/createNoteBook
  const createNoteBook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", {
        name: input,
      });
      return response.data;
    },
  });
  const uploadToFirebase = useMutation({
    mutationFn: async (noteId) => {
      const response = await axios.post("/api/uploadToFirebase", {
        noteId,
      });
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.length < 1) window.alert("Please enter a name for the note book");

    createNoteBook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        toast({
          title: "Note book created",
          description: "You can now add notes to this note book",
          status: "success",
        });
        uploadToFirebase.mutate(note_id);
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-green-600 h-full rounded-lg  items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <PlusIcon />
          <h2 className="font-semibold text-green-600 sm:mt-2">New Note</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>
            You can create a new note book here
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Note book name"
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button className="bg-gray-800 hover:bg-red-600" type="reset">
              Cancel
            </Button>
            <Button
              className="bg-teal-400 hover:bg-teal-600"
              disabled={createNoteBook.isPending}
            >
              {createNoteBook.isPending && (
                <Loader2 className="animate-spin mr-4" />
              )}
              {createNoteBook.isPending ? "Creating" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
