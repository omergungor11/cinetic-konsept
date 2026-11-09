"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { VideoControls } from "../motion";
import { OvalArrow, type ProjectCardData } from "../shared";

type FeaturedProject = ProjectCardData & { thumb: string; video: string };

export default function Featured({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const hero = useRef<HTMLElement>(null);
  const thumbnails = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<number | null>(null);
  const pendingSeek = useRef<{ index: number; fraction: number } | null>(null);
  const scrubbing = useRef(false);
  const wantsPlay = useRef(true);
  const visible = useRef(false);
  const project = projects[active];

  useEffect(() => {
    const element = video.current;
    const section = hero.current;
    if (!element || !section) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (
          entry.isIntersecting &&
          wantsPlay.current &&
          !scrubbing.current &&
          !reduced
        ) {
          void element.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          element.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [active]);

  function changeSlide(direction: number) {
    pendingSeek.current = null;
    setActive(
      (current) => (current + direction + projects.length) % projects.length,
    );
  }

  function seek(index: number, fraction: number) {
    const element = video.current;
    if (index === active && element && Number.isFinite(element.duration)) {
      element.currentTime = fraction * element.duration;
      pendingSeek.current = null;
    } else {
      pendingSeek.current = { index, fraction };
      setActive(index);
    }
    thumbnails.current[index]?.style.setProperty(
      "--thumb-progress",
      `${fraction * 100}%`,
    );
  }

  function scrub(event: PointerEvent<HTMLButtonElement>, index: number) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (event.clientX - left) / width));
    seek(index, fraction);
  }

  function stopScrubbing() {
    scrubbing.current = false;
    if (visible.current && wantsPlay.current)
      void video.current?.play().catch(() => {});
  }

  const isExternal = project.href.startsWith("http");

  return (
    <section
      ref={hero}
      className="inside-featured"
      aria-label="Featured projects"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          changeSlide(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          changeSlide(1);
        }
      }}
      onPointerDown={(event) => {
        touchStart.current = event.clientX;
      }}
      onPointerCancel={() => {
        touchStart.current = null;
      }}
      onPointerUp={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (start !== null && Math.abs(event.clientX - start) > 45)
          changeSlide(event.clientX < start ? 1 : -1);
      }}
    >
      <video
        key={project.video}
        ref={video}
        className="inside-featured-video"
        src={project.video}
        loop={projects.length === 1}
        muted={muted}
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          const request = pendingSeek.current;
          if (request?.index === active) {
            event.currentTarget.currentTime =
              request.fraction * event.currentTarget.duration;
            pendingSeek.current = null;
          }
        }}
        onTimeUpdate={(event) => {
          const element = event.currentTarget;
          if (Number.isFinite(element.duration) && element.duration > 0) {
            thumbnails.current[active]?.style.setProperty(
              "--thumb-progress",
              `${(element.currentTime / element.duration) * 100}%`,
            );
          }
        }}
        onEnded={() => changeSlide(1)}
      />
      <div className="inside-featured-copy" key={project.title}>
        <p className="inside-eyebrow">FEATURE FILM</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <Link
          className="inside-cta"
          href={project.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          Discover the project <OvalArrow />
        </Link>
      </div>
      <div
        className="inside-featured-nav"
        aria-label="Select or scrub a featured project"
      >
        {projects.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={item.title}
            aria-pressed={index === active}
            ref={(element) => {
              thumbnails.current[index] = element;
            }}
            onClick={() => setActive(index)}
            onPointerDown={(event) => {
              event.stopPropagation();
              if (!event.isPrimary || event.button !== 0) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              scrubbing.current = true;
              video.current?.pause();
              scrub(event, index);
            }}
            onPointerMove={(event) => {
              if (scrubbing.current) scrub(event, index);
            }}
            onLostPointerCapture={stopScrubbing}
          >
            <img src={item.thumb} alt="" draggable="false" />
            <img
              className="inside-thumb-cover"
              src={item.thumb}
              alt=""
              draggable="false"
            />
          </button>
        ))}
      </div>
      <VideoControls
        key={`controls-${project.video}`}
        video={video}
        onPlaybackChange={(playing) => {
          wantsPlay.current = playing;
        }}
        onMuteChange={setMuted}
      />
    </section>
  );
}
