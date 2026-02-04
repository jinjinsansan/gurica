"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  error?: string | null;
  uploading?: boolean;
}

export function FileUpload({ files, onChange, maxFiles = 5, error, uploading }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (incoming: FileList | File[]) => {
      const fileArray = Array.from(incoming ?? []);
      if (!fileArray.length) return;

      const next = [...files, ...fileArray].slice(0, maxFiles);
      onChange(next);
    },
    [files, maxFiles, onChange]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragActive(false);
      handleFiles(event.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (index: number) => {
    const next = [...files];
    next.splice(index, 1);
    onChange(next);
  };

  const previews = useMemo(
    () =>
      files.map((file) => ({
        name: file.name,
        src: URL.createObjectURL(file),
        size: file.size,
      })),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.src));
    };
  }, [previews]);

  return (
    <div className="space-y-4">
      <div
        className={`rounded-3xl border-2 border-dashed p-6 text-center transition ${
          dragActive ? "border-[var(--accent-blue)] bg-[var(--bg-accent)]" : "border-slate-200"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <UploadCloud className="mx-auto h-10 w-10 text-[var(--accent-blue)]" />
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          画像をドラッグ＆ドロップ、または
          <button
            type="button"
            className="text-[var(--accent-blue)] underline-offset-2 hover:underline"
            onClick={() => inputRef.current?.click()}
          >
            クリックして選択
          </button>
        </p>
        <p className="text-xs text-[var(--text-light)]">JPEG / PNG / WebP ・ 各5MB 以下 ・ 最大 {maxFiles} 枚</p>
        {uploading ? <div className="mt-4 h-2 w-full rounded-full bg-slate-100"><div className="h-full w-full animate-pulse rounded-full bg-[var(--accent-blue)]" /></div> : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          if (event.target.files) {
            handleFiles(event.target.files);
            event.target.value = "";
          }
        }}
      />

      {previews.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {previews.map((preview, index) => (
            <div key={`${preview.name}-${index}`} className="relative rounded-2xl border border-slate-100 p-3">
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label="画像を削除"
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-slate-500 shadow"
              >
                <X className="h-4 w-4" />
              </button>
              <Image
                src={preview.src}
                alt={preview.name}
                width={240}
                height={160}
                unoptimized
                className="h-24 w-full rounded-xl object-cover"
              />
              <p className="mt-2 truncate text-xs text-[var(--text-secondary)]">{preview.name}</p>
            </div>
          ))}
        </div>
      ) : null}

      {error ? <p className="text-sm text-[var(--accent-red)]">{error}</p> : null}
    </div>
  );
}
