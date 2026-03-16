import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bachelor Umfrage | Elterliche Trennung",
  description: "Wissenschaftliche Umfrage im Rahmen einer Bachelorarbeit über die Auswirkungen elterlicher Trennung.",
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
      </body>
    </html>
  );
}
