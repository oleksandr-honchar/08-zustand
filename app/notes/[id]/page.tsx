// import NotePreview from "@/components/NotePreview/NotePreview";
// import type { Metadata } from "next";

// type Note = {
//   id: string;
//   title: string;
//   description: string;
//   image?: string;
// };

// type Props = {
//   params: Promise<{ id: string }>;
// };

// async function getNoteById(id: string): Promise<Note> {

//   return {
//     id,
//     title: `Заголовок нотатки ${id}`,
//     description: `Короткий опис нотатки ${id}`,
//   };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const note = await getNoteById(id);

//   return {
//     title: note.title,
//     description: note.description,
//     openGraph: {
//       title: note.title,
//       description: note.description,
//       url: `https://yourdomain.com/notes/${id}`,
//       images: note.image ? [note.image] : [],
//     },
//   };
// }

// export default async function NotePage({ params }: Props) {
//   const { id } = await params;
//   return <NotePreview noteId={id} />;
// }

import NotePreview from "@/components/NotePreview/NotePreview";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Note = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

type Props = {
  params: { id: string };
};

// Фейковий API для прикладу
async function getNoteById(id: string): Promise<Note | null> {
  // Тут можна підключати справжній API
  if (Number(id) < 1) return null; // симуляція "не знайдено"
  return {
    id,
    title: `Заголовок нотатки ${id}`,
    description: `Короткий опис нотатки ${id}`,
    image: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
  };
}

// Генерація SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNoteById(params.id);

  if (!note) notFound(); // показує app/not-found.tsx

  return {
    title: note.title,
    description: note.description,
    openGraph: {
      title: note.title,
      description: note.description,
      url: `https://yourdomain.com/notes/${params.id}`,
      images: [
        {
          url: note.image ?? "/og-images/note.png",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "website",
      siteName: "NoteHub",
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.description,
      images: [note.image ?? "/og-images/note.png"],
    },
  };
}

// Компонент сторінки нотатки
export default async function NotePage({ params }: Props) {
  const note = await getNoteById(params.id);

  if (!note) notFound(); // перенаправлення на 404

  return <NotePreview noteId={note.id} />;
}
