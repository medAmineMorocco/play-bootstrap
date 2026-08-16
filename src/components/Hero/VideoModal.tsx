"use client";

import { useEffect, useState } from "react";

type Props = {
  thumbnailLight?: string;
  thumbnailDark?: string;
  videoId: string;
  triggerLabel?: string;
  triggerClassName?: string;
};

const VideoModal = ({
  thumbnailLight,
  thumbnailDark,
  videoId,
  triggerLabel,
  triggerClassName,
}: Props) => {
  const [open, setOpen] = useState(false);

  const openVideo = () => setOpen(true);

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
      {triggerLabel ? (
        <button
          type="button"
          onClick={openVideo}
          aria-haspopup="dialog"
          className={triggerClassName}
        >
          {triggerLabel}
        </button>
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={openVideo}
          role="button"
          tabIndex={0}
          aria-label="Play WorktreeWise demo video"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") openVideo();
          }}
        >
          <img
            src={thumbnailLight}
            alt="Video preview"
            className="mx-auto max-w-full dark:hidden"
          />
          <img
            src={thumbnailDark}
            alt="Video preview"
            className="mx-auto hidden max-w-full dark:block"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 transition hover:bg-black/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-[0_16px_45px_-10px_rgba(74,108,247,0.9)] transition duration-300 hover:scale-110 sm:h-24 sm:w-24">
              <svg
                width="34"
                height="40"
                viewBox="0 0 34 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="ml-1 fill-current"
              >
                <path d="M32 16.5359C34.6667 18.0755 34.6667 21.9245 32 23.4641L6.5 38.1865C3.83333 39.7261 0.5 37.8016 0.5 34.7224V5.27757C0.5 2.19837 3.83333 0.273871 6.5 1.81347L32 16.5359Z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)} // close on outside click
          role="dialog"
          aria-modal="true"
          aria-label="WorktreeWise demo video"
        >
          <div
            className="w-full max-w-4xl p-4"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking video
          >
            {/* Video (lazy loaded only when open) */}
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full rounded-lg"
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
