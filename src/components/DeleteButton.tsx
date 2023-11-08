"use client";

import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Toast, ToastAction } from "./ui/toast";
import axios from "axios";

type Props = {
  noteId: number;
};

export default function DeleteButton({ noteId }: Props) {
  const router = useRouter();

  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNote", {
        noteId,
      });
      return response.data;
    },
  });

  return (
    <Button
      className="ml-auto"
      size="sm"
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to delete this note?"
        );
        if (!confirm) return;
        deleteNote.mutate(undefined, {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (error) => {
            Toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          },
        });
      }}
    >
      Delete
    </Button>
  );
}
