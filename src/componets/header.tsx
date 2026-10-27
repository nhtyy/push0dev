import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <h1 className="site-title">
        <Link href="/">Nathan Bustamante</Link>
      </h1>
      <nav className="site-nav">
        <Link href="/">home</Link>
        <a href="https://github.com/nhtyy">github</a>
        <Link href="/contact">contact</Link>
      </nav>
    </header>
  );
}
