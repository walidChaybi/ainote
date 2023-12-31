import { Editor } from "@tiptap/react";
import "./styles.scss";
import {
  Bold,
  FileCode2,
  FlipVertical2,
  RemoveFormatting,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";

const Colors = [
  {
    color: "#2563eb",
    tag: "c",
    tailwindColor: "bg-blue-600",
  },
  {
    color: "#f97316",
    tag: "o",
    tailwindColor: "bg-orange-600",
  },
  {
    color: "#7c3aed",
    tag: "l",
    tailwindColor: "bg-violet-500",
  },
  {
    color: "#16a34a",
    tag: "o",
    tailwindColor: "bg-green-600",
  },
  {
    color: "#ef4444",
    tag: "r",
    tailwindColor: "bg-red-500",
  },
  {
    color: "#020617",
    tag: "s",
    tailwindColor: "bg-slate-950",
  },
];

const TipTapMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  const renderedColors = Colors.map((color) => {
    return (
      <div
        key={color.color}
        onClick={() => editor.chain().focus().setColor(color.color).run()}
        className={`w-6 h-6 rounded-full ${color.tailwindColor} flex justify-center items-center text-white cursor-pointer hover:scale-110 transform transition-all`}
      >
        {color.tag.toUpperCase()}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : " inactive "}
        >
          <Bold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : "inactive"}
        >
          <Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : "inactive"}
        >
          <Strikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="inactive"
        >
          <RemoveFormatting />
        </button>
        <button
          onClick={() => editor.commands.setHeading({ level: 1 })}
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : "inactive"
          }
        >
          <Heading1 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : "inactive"
          }
        >
          <Heading2 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : "inactive"
          }
        >
          <Heading3 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : "inactive"
          }
        >
          <Heading4 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : "inactive"}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : "inactive"}
        >
          <ListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : "inactive"}
        >
          <FileCode2 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : "inactive"}
        >
          <Quote />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="inactive"
        >
          <FlipVertical2 />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="hover:bg-orange-400 p-2 rounded-full"
        >
          <Undo2 />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="hover:bg-orange-400 p-2 rounded-full"
        >
          <Redo2 />
        </button>
      </div>

      <div className="flex gap-3">{renderedColors}</div>
    </div>
  );
};

export default TipTapMenuBar;
