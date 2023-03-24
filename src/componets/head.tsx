export default function Head() {
  const head_links: { title: string; url: string }[] = [
    { title: "twitter", url: "https://twitter.com/nuhhtyy" },
    { title: "github", url: "https://github.com/nuhhtyy" },
  ];
  return (
    <div className="header-links">
      {head_links.map(({ title, url }) => (
        <a
          key={title}
          href={url}
          style={{ padding: ".5vw" }}
          className={"hover-blue"}
        >
          {title}
        </a>
      ))}
    </div>
  );
}
