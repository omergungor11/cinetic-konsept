"use client";

import { useEffect, useState } from "react";
import Hero from "./hero";
import HomeSections from "./sections";
import "./home.css";

export function ConsentBanner() {
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    try {
      setShowCookies(!localStorage.getItem("cinetic-cookie-consent"));
    } catch {
      setShowCookies(true);
    }
  }, []);

  function saveConsent(value: string) {
    try {
      localStorage.setItem("cinetic-cookie-consent", value);
    } catch {
      /* Storage may be disabled. */
    }
    setShowCookies(false);
  }

  return showCookies ? (
    <aside className="cinetic-cookie-banner" aria-label="Cookie preferences">
      <p>
        This website uses cookies. By continuing to browse, you accept the use
        of cookies.
      </p>
      <div>
        <button onClick={() => saveConsent("declined")}>Decline</button>
        <button onClick={() => saveConsent("accepted")}>Accept</button>
      </div>
    </aside>
  ) : null;
}

export default function Home() {
  return (
    <>
      <Hero />
      <HomeSections />
      <ConsentBanner />
    </>
  );
}
