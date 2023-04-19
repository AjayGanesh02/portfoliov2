import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Layout from "../components/layout/layout";
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics/>
    </main>
  );
}
