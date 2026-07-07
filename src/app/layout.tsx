import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#C4943A",
};

export const metadata: Metadata = {
  title: "Shahil’s Wedding Invitation",
  description:
    "You are cordially Invited to the wedding ceremony of Shahil on 22nd July 2026.",
  openGraph: {
    title: "Shahil’s Wedding Invitation",
    description: "You are cordially Invited to the wedding ceremony of Shahil on 22nd July 2026.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahil’s Wedding Invitation",
    description: "You are cordially Invited to the wedding ceremony of Shahil on 22nd July 2026.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
