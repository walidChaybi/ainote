"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useState, useEffect, useRef, useMemo } from "react";
import TipTapMenuBar from "./TipTapMenuBar";
import Text from "@tiptap/extension-text";
import { Button } from "./ui/button";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCompletion } from "ai/react";

export default function TipTapEditor({ note }) {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1 className="text-center">${note.name}</h1>`
  );
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Ctrl-Space": () => {
          const prompt = this.editor.getText().split(" ").slice(-50).join(" ");
          complete(prompt);
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
        },
        orderedList: {
          keepMarks: true,
        },
      }),
      customText,
    ],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = useRef("");
  useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion]);

  // useEffect(() => {
  //   if (!editor || !token) return;
  //   editor.commands.insertContent(token);
  // }, [token, editor]);

  const debounceEditorState = useDebounce(editorState, 5000);
  useEffect(() => {
    if (debounceEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: () => {
        // console.log("saved");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, [debounceEditorState]);
  {
    if (!editor) return null;
  }
  return (
    <>
      <div className="flex justify-between">
        <TipTapMenuBar editor={editor} />
        <Button
          className="bg-teal-500"
          onClick={() =>
            saveNote.mutate(undefined, {
              onSuccess: () => {
                // console.log("saved");
              },
              onError: (error) => {
                console.log(error);
              },
            })
          }
        >
          {saveNote.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
      <div className="h-8"></div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
