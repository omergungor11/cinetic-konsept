"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./hero.css";

const headline =
  "WE ARE A CREATIVE HOUSE SHAPING ADVERTISING, CINEMA AND EXPERIENCE DESIGN, THAT MOVE PEOPLE.";
const introDuration = 2000;

const categories = [
  ["ADVERTISING", "/projects/?category_name=advertising"],
  ["CINEMA", "/cinema/"],
  ["EXPERIENCE DESIGN", "/projects/?category_name=experience-design"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setActiveCategory(null);
        trigger.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          trigger.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index <= 0) {
          event.preventDefault();
          items.at(-1)?.focus();
        } else if (!event.shiftKey && index === items.length - 1) {
          event.preventDefault();
          items[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  function closeMenu() {
    setOpen(false);
    setActiveCategory(null);
  }

  return (
    <>
      <header className={`cc-header ${open ? "cc-header-open" : ""}`}>
        <Link
          href="/"
          onNavigate={closeMenu}
          aria-label="Cinetic Creatives home"
          className="cc-brand"
        >
          <img src="/media/cinetic-logo.svg" alt="Cinetic Creatives" />
        </Link>
        <button
          ref={trigger}
          className="cc-menu-toggle"
          aria-expanded={open}
          aria-controls="cc-navigation"
          onClick={() => (open ? closeMenu() : setOpen(true))}
        >
          <span>{open ? "CLOSE" : "MENU"}</span>
          <span className="cc-menu-bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <nav
        ref={menu}
        id="cc-navigation"
        aria-label="Main navigation"
        className={`cc-navigation ${open ? "is-open" : ""}`}
        inert={!open}
      >
        <div className="cc-nav-film" aria-hidden="true">
          {open && (
            <div className="cc-nav-film-wheel">
              {["advertising", "cinema", "experience-design"].map(
                (category, index) => (
                  <video
                    key={category}
                    className={
                      index === (activeCategory ?? 0) ? "is-current" : ""
                    }
                    src={`/media/${category}.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ),
              )}
            </div>
          )}
        </div>
        <div
          className="cc-nav-categories"
          onMouseLeave={() => setActiveCategory(null)}
        >
          {categories.map(([name, url], index) => (
            <Link
              style={{
                transitionDelay: open ? `${index * 70 + 100}ms` : "0ms",
              }}
              key={url}
              href={url}
              onMouseEnter={() => setActiveCategory(index)}
              onFocus={() => setActiveCategory(index)}
              onNavigate={closeMenu}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="cc-nav-secondary">
          <Link href="/about/" onNavigate={closeMenu}>
            About
          </Link>
          <span>—</span>
          <Link href="/services/" onNavigate={closeMenu}>
            Services
          </Link>
          <span>—</span>
          <a href="mailto:hello@cinetic-creatives.com" onClick={closeMenu}>
            Contact
          </a>
        </div>
      </nav>
    </>
  );
}

export default function Hero() {
  const [intro, setIntro] = useState(true);
  const [paused, setPaused] = useState(false);
  const [exiting, setExiting] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const hero = useRef<HTMLElement>(null);
  const finishIntro = () => {
    setExiting(true);
    window.scrollTo(0, 0);
    try {
      sessionStorage.setItem("cinetic-intro-seen", "1");
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  };
  useEffect(() => {
    if (!intro) return;
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("cinetic-intro-seen"));
    } catch {
      /* Intro remains usable without storage. */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntro(false);
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [intro]);
  useEffect(() => {
    if (!exiting) return;
    const timeout = window.setTimeout(() => setIntro(false), introDuration);
    return () => window.clearTimeout(timeout);
  }, [exiting]);
  useEffect(() => {
    const heading = hero.current?.querySelector("h1");
    if (!heading || !intro) return;
    const words = Array.from(
      heading.querySelectorAll<HTMLElement>(".cc-hero-word"),
    );
    const measure = () => {
      const lines = [...new Set(words.map((word) => word.offsetTop))];
      const center = Math.floor(lines.length / 2);
      const middleX = heading.offsetWidth / 2;
      for (const word of words) {
        const line = lines.indexOf(word.offsetTop);
        const position = word.offsetLeft + word.offsetWidth / 2;
        word.style.setProperty(
          "--word-x",
          line === center ? (position < middleX ? "-52vw" : "52vw") : "0px",
        );
        word.style.setProperty(
          "--word-y",
          line < center ? "-52svh" : line > center ? "52svh" : "0px",
        );
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(heading);
    measure();
    return () => observer.disconnect();
  }, [intro]);
  useEffect(() => {
    if (!intro || paused || exiting) return;
    const timeout = window.setTimeout(() => {
      if ((video.current?.currentTime ?? 0) < 0.2) finishIntro();
    }, 15000);
    return () => window.clearTimeout(timeout);
  }, [intro, paused, exiting]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!hero.current) return;
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        hero.current.style.setProperty("--hero-scroll", `${progress}`);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <>
      <SiteHeader />
      <section
        ref={hero}
        className={`cc-hero ${!intro || exiting ? "cc-hero-visible" : ""} ${intro ? "cc-hero-splitting" : ""}`}
        aria-label="Cinetic Creatives"
      >
        <h1 aria-label={headline}>
          {headline.split(" ").map((word, index) => (
            <span className="cc-hero-token" key={index} aria-hidden="true">
              <span className="cc-hero-word">{word}</span>{" "}
            </span>
          ))}
        </h1>
      </section>
      {intro && (
        <div className={`cc-intro ${exiting ? "is-exiting" : ""}`}>
          <video
            ref={video}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/media/showreel-poster.jpg"
            onEnded={finishIntro}
            onError={finishIntro}
          >
            <source src="/media/showreel.mp4" type="video/mp4" />
          </video>
          <button className="cc-skip-intro" onClick={finishIntro}>
            Skip intro <span aria-hidden="true">→</span>
          </button>
          <button
            className="cc-intro-pause"
            aria-label={paused ? "Play intro" : "Pause intro"}
            onClick={() => {
              if (video.current) {
                if (paused) void video.current.play().catch(() => {});
                else video.current.pause();
                setPaused(!paused);
              }
            }}
          >
            {paused ? "▷" : "Ⅱ"}
          </button>
        </div>
      )}
    </>
  );
}
