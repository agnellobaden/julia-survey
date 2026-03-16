import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bachelor Umfrage | Elterliche Trennung",
  description: "Wissenschaftliche Umfrage im Rahmen einer Bachelorarbeit über die Auswirkungen elterlicher Trennung.",
  openGraph: {
    title: "Bachelor Umfrage | Elterliche Trennung",
    description: "Nimm an meiner wissenschaftlichen Umfrage teil. Anonym & DSGVO-konform.",
    images: [
      {
        url: 'https://julia-survey.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bachelor Umfrage Vorschau',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bachelor Umfrage | Elterliche Trennung',
    description: 'Wissenschaftliche Umfrage im Rahmen einer Bachelorarbeit.',
    images: ['https://julia-survey.vercel.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={outfit.className}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-black to-black"></div>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
