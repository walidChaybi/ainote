"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useState } from "react";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

export default function TipTapEditor() {
  const [editorState, setEditorState] = useState("");

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
    ],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  return (
    <>
      <div className="flex justify-between">
        <TipTapMenuBar editor={editor} />
        <Button>Save</Button>
      </div>
      <div className="h-8"></div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
