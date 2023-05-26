export default function Head() {
  const head_links: { title: string; url: string }[] = [
    { title: "github", url: "https://github.com/nhtyy" },
  ];
  return (
    <div className="header-links">
      {head_links.map(({ title, url }) => (
        <a key={title} href={url} className={"hover-red"}>
          {title}
        </a>
      ))}
    </div>
  );
}
