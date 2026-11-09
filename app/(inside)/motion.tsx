"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector(".inside");
    if (!root) return;
    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    const observe = () =>
      root
        .querySelectorAll("[data-reveal]:not(.visible)")
        .forEach((item) => observer.observe(item));
    observe();
    const changes = new MutationObserver(observe);
    changes.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      changes.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}

export function VideoControls({
  video,
  onPlaybackChange,
  onMuteChange,
}: {
  video: React.RefObject<HTMLVideoElement | null>;
  onPlaybackChange?: (playing: boolean) => void;
  onMuteChange?: (muted: boolean) => void;
}) {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const update = () => {
      setMuted(element.muted);
      setPlaying(!element.paused);
    };
    const events = ["play", "pause", "ended", "volumechange", "emptied"];
    events.forEach((name) => element.addEventListener(name, update));
    update();
    return () =>
      events.forEach((name) => element.removeEventListener(name, update));
  }, [video]);

  return (
    <div className="inside-video-controls">
      <button
        type="button"
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={() => {
          if (video.current) {
            video.current.muted = !video.current.muted;
            onMuteChange?.(video.current.muted);
          }
        }}
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M2 8h4l4-4v12l-4-4H2z" fill="currentColor" />
          {muted ? (
            <path d="m13 8 4 4m0-4-4 4" stroke="currentColor" />
          ) : (
            <path
              d="M13 7a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10"
              stroke="currentColor"
            />
          )}
        </svg>
      </button>
      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={() => {
          const element = video.current;
          if (!element) return;
          onPlaybackChange?.(element.paused);
          if (element.paused) void element.play().catch(() => {});
          else element.pause();
        }}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          {playing ? (
            <path d="M6 4h2.5v12H6zm5.5 0H14v12h-2.5z" />
          ) : (
            <path d="m6 3 11 7-11 7z" />
          )}
        </svg>
      </button>
    </div>
  );
}

export function Film({
  src,
  poster,
  loop,
  auto,
  controls,
}: {
  src: string;
  poster?: string;
  loop?: boolean;
  auto?: boolean;
  controls?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  useEffect(() => {
    const element = video.current;
    if (
      !element ||
      !auto ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !manuallyPaused.current)
          void element.play().catch(() => {});
        if (!entry.isIntersecting && !element.paused) element.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [auto]);

  return (
    <figure className="inside-film">
      <video
        ref={video}
        src={src}
        poster={poster || undefined}
        muted
        loop={loop}
        playsInline
        preload="metadata"
        onClick={(event) => {
          const element = event.currentTarget;
          manuallyPaused.current = !element.paused;
          if (element.paused) void element.play().catch(() => {});
          else element.pause();
        }}
      />
      {controls && (
        <VideoControls
          video={video}
          onPlaybackChange={(playing) => {
            manuallyPaused.current = !playing;
          }}
        />
      )}
    </figure>
  );
}
