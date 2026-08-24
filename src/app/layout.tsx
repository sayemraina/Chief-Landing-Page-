import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chief · Context comes to you",
  description:
    "Mid-market CRE teams spend more time assembling context than acting on it. Chief captures site visits, structures the data, and gets your whole team up to speed.",
  openGraph: {
    title: "Chief · Context comes to you",
    description:
      "Mid-market CRE teams spend more time assembling context than acting on it. Chief captures site visits, structures the data, and gets your whole team up to speed.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-text-primary font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
