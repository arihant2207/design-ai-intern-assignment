import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./academy.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

const title = "AI Skills Academy — Practical AI and digital skills";
const description =
  "A hands-on programme for students and young professionals to build real workflows, interfaces, and automations across modern AI tools.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-theme="academy"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrainsMono.variable}`}
    >
      {children}
    </div>
  );
}

