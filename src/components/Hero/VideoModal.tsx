"use client";

import { useEffect, useState } from "react";

type Props = {
  thumbnailLight: string;
  thumbnailDark: string;
  videoId: string;
};

const VideoModal = ({ thumbnailLight, thumbnailDark, videoId }: Props) => {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <>
      {/* Thumbnail */}
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Light */}
        <img
          src={thumbnailLight}
          alt="Video preview"
          className="mx-auto max-w-full dark:hidden"
        />

        {/* Dark */}
        <img
          src={thumbnailDark}
          alt="Video preview"
          className="mx-auto max-w-full hidden dark:block"
        />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 backdrop-blur transition hover:scale-110">
            ▶
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)} // close on outside click
        >
          <div
            className="w-full max-w-4xl p-4"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking video
          >
            {/* Video (lazy loaded only when open) */}
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;