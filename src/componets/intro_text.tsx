import Link from "next/link";

export default function IntroText() {
  return (
    <div className="intro-text">
      <h1>nuhhtyy.xyz</h1>
      <Link href="/" className={"hover-blue"}>
        home
      </Link>
      <Link href="/about" className={"hover-blue"}>
        about
      </Link>
      <Link href="/contact" className={"hover-blue"}>
        contact
      </Link>
    </div>
  );
}
