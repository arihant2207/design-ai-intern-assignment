import type { Metadata } from "next";
import {
  Fraunces,
  Instrument_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
} from "next/font/google";
import { BRAND_NAME, SAMPLE_CITY } from "@/lib/config";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
  weight: ["500", "600"],
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-noto-gujarati",
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Veterinary & animal care directory in ${SAMPLE_CITY}`,
  description: `Discover veterinary clinics, 24x7 animal hospitals, diagnostics labs, boarding, ambulances, and rescue NGOs in ${SAMPLE_CITY}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${notoDevanagari.variable} ${notoGujarati.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-forest font-sans antialiased selection:bg-terracotta/15 selection:text-forest-deep">
        {children}
      </body>
    </html>
  );
}
