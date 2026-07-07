import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "../components/site/providers";
import { Header } from "../components/site/header";
import { Footer } from "../components/site/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: {
    default: "Ajay Ganesh",
    template: "%s · Ajay Ganesh",
  },
  description:
    "Software engineer at Meta. Projects, work experience, and experiments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-white font-sans text-[15px]/relaxed text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <Providers>
          <div className="mx-auto max-w-2xl px-6 py-10 md:py-16">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
