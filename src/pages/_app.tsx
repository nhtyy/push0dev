import Header from "@/componets/header";
import "@/styles/styling.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="page">
      <Head>
        <title>Nathan Bustamante</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="content">
        <Component {...pageProps} />
      </main>
      <footer className="site-footer" aria-hidden="true">
        &#8718;
      </footer>
    </div>
  );
}
