import Head from "@/componets/head";
import IntroText from "@/componets/intro_text";
import "@/styles/styling.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="App">
      <Head />
      <div className="body">
        <IntroText />
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
