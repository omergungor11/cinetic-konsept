import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Home - Cinetic Creatives",
    template: "%s - Cinetic Creatives",
  },
  description:
    "A creative house shaping advertising, cinema and experience design, that move people.",
  icons: {
    icon: "https://cinetic-creatives.com/wp-content/uploads/2026/01/android-chrome-512x512-1-150x150.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
