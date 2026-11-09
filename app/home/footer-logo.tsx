"use client";

import { useEffect, useRef } from "react";

export default function FooterLogo() {
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef({ pointer: -1, x: 0, y: 0, yaw: 0, pitch: 0 });

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function rotate(element: HTMLDivElement, yaw: number, pitch: number) {
    drag.current.yaw = yaw;
    drag.current.pitch = pitch;
    element.style.setProperty("--logo-yaw", `${yaw}deg`);
    element.style.setProperty("--logo-pitch", `${pitch}deg`);
  }

  function release(element: HTMLDivElement) {
    drag.current.pointer = -1;
    element.classList.remove("is-dragging");
    rotate(element, 0, 0);
  }

  return (
    <div
      ref={stage}
      className="cc-footer-stage"
      tabIndex={0}
      role="group"
      aria-label="Interactive logo. Drag or use the arrow keys to rotate."
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        drag.current = {
          pointer: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          yaw: 0,
          pitch: 0,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.classList.add("is-dragging");
      }}
      onPointerMove={(event) => {
        const { pointer, x, y } = drag.current;
        if (pointer !== event.pointerId) return;
        rotate(
          event.currentTarget,
          (event.clientX - x) * 0.6,
          (y - event.clientY) * 0.45,
        );
      }}
      onLostPointerCapture={(event) => release(event.currentTarget)}
      onKeyDown={(event) => {
        const deltas: Record<string, [number, number]> = {
          ArrowLeft: [-25, 0],
          ArrowRight: [25, 0],
          ArrowUp: [0, 20],
          ArrowDown: [0, -20],
        };
        const delta = deltas[event.key];
        if (event.key === "Escape") release(event.currentTarget);
        if (!delta) return;
        event.preventDefault();
        rotate(
          event.currentTarget,
          drag.current.yaw + delta[0],
          drag.current.pitch + delta[1],
        );
      }}
    >
      <img
        src="/media/cinetic-logo.svg"
        alt="Cinetic Creatives"
        draggable="false"
        loading="lazy"
      />
    </div>
  );
}
