import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create a new note quickly and easily.",
  openGraph: {
    title: "Create Note",
    description: "Create a new note quickly and easily.",
    url: "https://08-zustand-three-rho.vercel.app/notes/action/create",
    images: [],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
