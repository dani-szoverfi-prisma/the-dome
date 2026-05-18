import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | The Dome",
    default: "The Dome — Fine Dining Satu Mare",
  },
  description:
    "The Dome este un restaurant de fine dining din Satu Mare, oferind o experiență gastronomică de excepție.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
