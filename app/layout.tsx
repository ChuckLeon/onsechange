import "./globals.scss";
import type { Metadata } from "next";
import { Gloock, Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Échange de cadeau!",
  description:
    "Site simple et beau pour faire des échanges de cadeaux en famille ou entre amis",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={clsx(inter.variable, gloock.variable)}>{children}</body>
    </html>
  );
}
