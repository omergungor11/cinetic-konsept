"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import FooterLogo from "./footer-logo";
import "./sections.css";

const media: { src: string; video: boolean; poster: string }[] = [
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/09/ezgif-615e0020eed4774b.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/09/ezgif-615e0020eed4774b-300x162.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/02/MIDO-MULTIFORT-2023-4444-Loop-1-1.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/02/MIDO-MULTIFORT-2023-4444-Loop-1-1-300x169.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/05/29_LAZZARO_FELICCE_STILLS_0007_STILL_0004-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/05/28_L_OFRENA_STILLS_0008_STILL_0000-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/05/27_LA_MIF_STILLS_0008_STILL_0003-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/05/26_FAVOLACCE_STILLS_0000_STILL_0010-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/05/23_ARIAFERMA_STILLS_0002_STILL_0005-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/20_L_ETINCELLE_STILLS_0003_STILL_0005-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/17_O_VENTO_ASSOBIANDO_NAS_GRUAS_STILLS_0002_STILL_0006-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/JLC_HOLIDAYS_REVERSO_23_TILLS_0000_STILL_15-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/12_SAY_GOD_BYE_STILLS_0003_STILL_0008-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/8_ALLEGORIE_CITADINE_STILLS_0002_STILL_0003-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/02/MIDO_STILLS_0001_Capture-decran-2026-04-01-a-11.14.32-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/02/MIDO-MULTIFORT-2023-4444-Loop-1-1.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/02/MIDO-MULTIFORT-2023-4444-Loop-1-1-300x169.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/MBF_HM11_STILLS_0007_STILL_0003-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/14-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/7_LA_CACHE_STILLS_0004_STILL_0004-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/MBF_HM11_STILLS_0009_STILL_0001-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/12-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/9-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/LOOP2HM11.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/06/LOOP2HM11-300x169.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/EBEL_1911_CHRONOGRAPH_ICE_BLUE_STILLS_0006_Ebel_4-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/Ebel_Freestudio_Loop_Clustr-Films_V1-0001_EBEL-Coumpound-1.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/06/Ebel_Freestudio_Loop_Clustr-Films_V1-0001_EBEL-Coumpound-1-300x168.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/6-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/2-2.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/06/2-2-300x168.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/Capture-decran-2026-09-07-a-13.11.46-768x432.png",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/LOOP3.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/06/LOOP3-300x228.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/CC_EBEL_115TH_STILLS_0000_Capture-decran-2026-05-29-a-11.28.30-768x584.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/JLC_WW_26_STILLS_0003_3-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/09/ezgif-626b7b7f3f135055.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/09/ezgif-626b7b7f3f135055-300x162.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/11-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/10-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/Capture-decran-2026-09-07-a-13.11.46-768x432.png",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/3-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/06/JLC_WW_26_STILLS_0005_1-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/02/MIDO-MULTIFORT-2023-4444-Loop-3-1.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/02/MIDO-MULTIFORT-2023-4444-Loop-3-1-300x169.gif",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/09/Sartoro2025_Winter02_Lifestyle_2-768x512.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/1-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/2-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/4-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/5-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/7-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/8-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/16-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/15-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/10/13-768x432.jpg",
    video: false,
    poster: "",
  },
  {
    src: "https://cinetic-creatives.com/wp-content/uploads/2026/09/ezgif-650349a3dfc24a9d.mp4",
    video: true,
    poster:
      "https://cinetic-creatives.com/wp-content/uploads/2026/09/ezgif-650349a3dfc24a9d-300x162.gif",
  },
];
const reels = [
  {
    title: "ADVERTISING",
    href: "/projects/?category_name=advertising",
    src: "/media/advertising.mp4",
  },
  { title: "CINEMA", href: "/cinema/", src: "/media/cinema.mp4" },
  {
    title: "EXPERIENCE DESIGN",
    href: "/projects/?category_name=experience-design",
    src: "/media/experience-design.mp4",
  },
];
function Arrow() {
  return (
    <svg
      width="38"
      height="18"
      viewBox="0 0 38 18"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="19" cy="9" rx="18.5" ry="8.5" stroke="currentColor" />
      <path d="M13 9h12m0 0-3-3m3 3-3 3" stroke="currentColor" />
    </svg>
  );
}

function MovingGallery() {
  const root = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, offset: 0 });
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let frame = 0,
      time = 0,
      last = 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = Array.from(
      el.querySelectorAll<HTMLElement>(".cc-orbit-item"),
    );
    let visible = false;
    const videos = el.querySelectorAll("video");
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        for (const video of videos) {
          if (visible && !reduced) void video.play().catch(() => {});
          else video.pause();
        }
      },
      { rootMargin: "160px" },
    );
    observer.observe(el);
    const animate = (now: number) => {
      if (visible) {
        if (!drag.current.active && !reduced)
          time += Math.min(now - last, 40) * 0.000055;
        const width = el.clientWidth,
          height = el.clientHeight;
        const section = el.parentElement?.getBoundingClientRect();
        const scrollProgress =
          !reduced && section ? Math.max(0, -section.top) / height : 0;
        items.forEach((item, i) => {
          const phase =
            (((time +
              scrollProgress * 0.6 +
              i / items.length +
              drag.current.offset / width) %
              1) +
              1) %
            1;
          const along = 1 - phase;
          const x = width * (-0.12 + 1.38 * along);
          const y =
            height * (0.16 + 0.64 * Math.sin(along * Math.PI * 0.82)) +
            Math.sin(i * 7) * height * 0.08;
          const scale =
            0.2 + 0.8 * Math.exp(-Math.pow((along - 0.46) / 0.22, 4));
          item.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
          item.style.opacity = String(Math.min(phase * 8, (1 - phase) * 8, 1));
          item.style.zIndex = String(Math.round(scale * 100));
        });
      }
      last = now;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);
  const start = (event: PointerEvent<HTMLDivElement>) => {
    drag.current.active = true;
    drag.current.x = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current.active) {
      drag.current.offset += event.clientX - drag.current.x;
      drag.current.x = event.clientX;
    }
  };
  return (
    <section
      className="cc-gallery-section"
      aria-label="A moving selection of our creative work"
    >
      <div
        className="cc-orbit"
        ref={root}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={() => {
          drag.current.active = false;
        }}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") drag.current.offset += 80;
          if (event.key === "ArrowLeft") drag.current.offset -= 80;
        }}
        aria-label="Drag the images or use the left and right arrow keys to explore"
      >
        {media.map((asset, i) => (
          <figure className="cc-orbit-item" key={asset.src + i}>
            {asset.video ? (
              <video
                src={asset.src}
                poster={asset.poster}
                muted
                loop
                playsInline
                preload="none"
              />
            ) : (
              <img
                src={asset.src}
                alt="A selection of Cinetic cinema, advertising and experience design projects"
                draggable={false}
                loading="lazy"
              />
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

function CategoryReels() {
  const root = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const active = Math.min(2, Math.round(progress));
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (root.current) {
        const box = root.current.getBoundingClientRect();
        setProgress(
          Math.max(
            0,
            Math.min(2, (-box.top / Math.max(1, box.height - innerHeight)) * 2),
          ),
        );
      }
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    update();
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    videos.current.forEach((video, i) => {
      if (video) {
        video.muted = muted || i !== active;
        if (paused) video.pause();
        else video.play().catch(() => {});
      }
    });
  }, [muted, paused, active]);
  return (
    <section
      ref={root}
      className="cc-reels"
      aria-label="Our creative disciplines"
    >
      <div className="cc-reels-sticky">
        {reels.map((reel, i) => (
          <video
            key={reel.title}
            ref={(el) => {
              videos.current[i] = el;
            }}
            className="cc-reel-film"
            style={{
              opacity:
                i === 0
                  ? 1
                  : Math.max(0, Math.min(1, (progress - i + 0.65) / 0.65)),
            }}
            src={reel.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ))}
        <div className="cc-reel-shade" />
        {reels.map((reel, i) => (
          <div
            className={`cc-reel-caption ${active === i ? "is-active" : ""}`}
            key={reel.title}
            aria-hidden={active !== i}
          >
            <h2>{reel.title}</h2>
            <Link
              className="cc-text-link"
              href={reel.href}
              tabIndex={active === i ? 0 : -1}
            >
              Discover all the projects <Arrow />
            </Link>
          </div>
        ))}
        <div className="cc-reel-controls">
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "Unmute film" : "Mute film"}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M8 4 4 7H1v4h3l4 3V4Z" stroke="currentColor" />
                <path d="m12 6 5 6m0-6-5 6" stroke="currentColor" />
              </svg>
            ) : (
              "♪"
            )}
          </button>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play film" : "Pause film"}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ showLogo = false }: { showLogo?: boolean }) {
  return (
    <>
      <section className="cc-contact">
        <h2 data-reveal>JOIN THE MOVEMENT</h2>
        <a className="cc-text-link" href="mailto:hello@cinetic-creatives.com">
          Contact <Arrow />
        </a>
      </section>
      <footer className={showLogo ? "cc-footer cc-footer-home" : "cc-footer"}>
        {showLogo && <FooterLogo />}
        <div className="cc-footer-details">
          <div>
            <p>
              Rue des Vieux-Grenadiers 10
              <br />
              1205 . Geneva – Switzerland
            </p>
            <Link className="cc-terms" href="/terms-and-conditions/">
              TERMS &amp; CONDITIONS
            </Link>
          </div>
          <p className="cc-credit">
            Designed by{" "}
            <a
              href="https://bonhommeparis.com/"
              target="_blank"
              rel="noreferrer"
            >
              Bonhomme
            </a>
          </p>
          <nav aria-label="Footer navigation">
            <Link href="/about/">About</Link>
            <Link href="/services/">Services</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default function HomeSections() {
  const manifesto = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = manifesto.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("is-visible");
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <MovingGallery />
      <section className="cc-manifesto" ref={manifesto}>
        <h2>
          <span>BRINGING TOGETHER</span>
          <span>THE BEST TALENTS FROM EACH INDUSTRY,</span>
          <span>WE BELIEVE CREATIVITY IS MORE</span>
          <span>THAN EXPRESSION. IT’S A FORCE</span>
          <span>THAT HAS MEANINGFUL RESONANCE.</span>
        </h2>
        <Link className="cc-text-link" href="/about/">
          About <Arrow />
        </Link>
      </section>
      <CategoryReels />
      <SiteFooter showLogo />
    </>
  );
}
