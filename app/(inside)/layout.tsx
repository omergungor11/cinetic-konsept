import { SiteHeader } from "../home/hero";
import { ConsentBanner } from "../home/home";
import { SiteFooter } from "../home/sections";
import { ScrollReveals } from "./motion";
import "./inside.css";

export default function InsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inside">
      <SiteHeader />
      <ScrollReveals />
      <main>{children}</main>
      <SiteFooter />
      <ConsentBanner />
    </div>
  );
}
