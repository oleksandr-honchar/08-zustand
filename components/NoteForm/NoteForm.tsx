"use client";

import { useState, useEffect } from "react";
import css from "./NoteForm.module.css";
import { useNoteStore } from "@/lib/stores/noteStore";
import type { CreateNotePayload } from "@/lib/api";

export interface NoteFormProps {
  onAdd?: (payload: CreateNotePayload) => void;
  onCancel?: () => void;
}

export default function NoteForm({ onAdd, onCancel }: NoteFormProps) {
  const { draft, saveDraft, clearDraft } = useNoteStore();
  const [title, setTitle] = useState(draft?.title || "");
  const [content, setContent] = useState(draft?.content || "");
  const [tag, setTag] = useState<CreateNotePayload["tag"]>(draft?.tag || "Todo");

  useEffect(() => {
    saveDraft({ title, content, tag });
  }, [title, content, tag, saveDraft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      alert("Title must be at least 3 characters long");
      return;
    }
    if (title.trim().length > 50) {
      alert("Title must be at most 50 characters long");
      return;
    }
    if (content.trim().length > 500) {
      alert("Content must be at most 500 characters long");
      return;
    }
    if (!tag) {
      alert("Tag is required");
      return;
    }

    const payload: CreateNotePayload = { title: title.trim(), content: content.trim(), tag };
    if (onAdd) await onAdd(payload);

    clearDraft();
    setTitle("");
    setContent("");
    setTag("Todo");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={css.input}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={css.textarea}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value as CreateNotePayload["tag"])}
          className={css.select}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        {onCancel && (
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
