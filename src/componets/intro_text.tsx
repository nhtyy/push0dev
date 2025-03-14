import Link from "next/link";

export default function IntroText() {
  return (
    <div className="intro-text">
      {/* <h1></h1> */}
      <Link href="/" className={"hover-red"}>
        home
      </Link>
      <a href="https://github.com/nhtyy" className={"hover-red"}>
        github
      </a>
      <Link href="/contact" className={"hover-red"}>
        contact
      </Link>
    </div>
  );
}
