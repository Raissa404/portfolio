import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { personal } from "@/lib/data";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personal.last} ${personal.first} — Portfolio`,
  description:
    "Portfolio de FANEVASOA Onjatina Raissa, étudiante en L2 informatique à l'EMIT. Développement web et logiciel : Next.js, JavaScript, Java, C#, PHP, MySQL.",
  keywords: [
    "FANEVASOA Onjatina Raissa",
    "portfolio",
    "développeuse web",
    "étudiante informatique",
    "EMIT",
    "Next.js",
    "développement web",
  ],
  openGraph: {
    title: `${personal.last} ${personal.first} — Portfolio`,
    description:
      "Développeur fullstack, passionné par le développement web et logiciel.",
    type: "website",
    locale: "fr_FR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#16130f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
