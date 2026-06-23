"use client";

import { GripVertical, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export type AdminMediaItem = {
  id?: string;
  url: string;
  alt: string;
  sortOrder: number;
};

type Props = {
  value: AdminMediaItem[];
  onChange: (items: AdminMediaItem[]) => void;
  folder: string;
  label?: string;
  multiple?: boolean;
};

function normalizeOrder(items: AdminMediaItem[]) {
  return items.map((item, index) => ({ ...item, sortOrder: index }));
}

export function AdminMediaUploader({
  value,
  onChange,
  folder,
  label = "Фотографии",
  multiple = true
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList | File[]) {
    const selected = Array.from(files);
    if (!selected.length) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.set("folder", folder || "catalog");
    selected.forEach((file) => formData.append("files", file));

    const response = await fetch("/api/admin/media", {
      method: "POST",
      body: formData
    });

    setUploading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Не удалось загрузить фото.");
      return;
    }

    const data = (await response.json()) as { files: { url: string; alt: string }[] };
    const nextFiles = data.files.map((file, index) => ({
      ...file,
      sortOrder: value.length + index
    }));
    onChange(normalizeOrder(multiple ? [...value, ...nextFiles] : nextFiles.slice(0, 1)));
  }

  function remove(index: number) {
    onChange(normalizeOrder(value.filter((_, itemIndex) => itemIndex !== index)));
  }

  function updateAlt(index: number, alt: string) {
    onChange(value.map((item, itemIndex) => (itemIndex === index ? { ...item, alt } : item)));
  }

  function reorder(from: number, to: number) {
    if (from === to) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(normalizeOrder(next));
  }

  return (
    <div className="admin-media">
      <div className="admin-media-head">
        <strong>{label}</strong>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        hidden
        onChange={(event) => {
          if (event.currentTarget.files) void upload(event.currentTarget.files);
          event.currentTarget.value = "";
        }}
      />

      <div
        className="admin-media-dropzone"
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void upload(event.dataTransfer.files);
        }}
      >
        <UploadCloud size={22} aria-hidden />
        <span>Перетащите фото сюда или нажмите на это поле</span>
      </div>

      {error ? <p className="error">{error}</p> : null}

      {value.length ? (
        <div className="admin-media-list">
          {value.map((item, index) => (
            <div
              className="admin-media-card"
              key={`${item.url}-${index}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex != null) reorder(dragIndex, index);
                setDragIndex(null);
              }}
            >
              <button className="admin-media-grip" type="button" aria-label="Перетащить фото">
                <GripVertical size={18} aria-hidden />
              </button>
              <Image src={item.url} alt="" width={72} height={56} className="admin-media-thumb" />
              <input
                className="input admin-media-alt"
                value={item.alt}
                placeholder="Alt / подпись"
                onChange={(event) => updateAlt(index, event.target.value)}
              />
              <button
                className="icon-button"
                type="button"
                aria-label="Удалить фото"
                onClick={() => remove(index)}
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted admin-media-empty">Фото пока не загружены.</p>
      )}
    </div>
  );
}
