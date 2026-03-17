export function LinkList({
  links,
}: {
  links: { title: string; description: string, url: string, position?: string, start?: string, end?: string }[];
}) {
  return (
    <ul style={{ listStyle: "none",
      paddingLeft: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center", }}>
      {links.map(({ title, description, url, position, start, end }) => (
        <li key={title} style={{ width: "100%", maxWidth: "clamp(320px, 50vw, 600px)" }}>
          <a href={url} className={"hover-red"}>
            <span style={{ fontSize: "2.5vh" }}>{title}</span>
          </a>
          {position && <div style={{ color: "gray", fontStyle: "italic"}}>{position} </div>}
          {start && end && <div style={{ color: "gray", fontStyle: "italic" }}>{start}-{end}</div>}
          <h5 style={{marginTop: ".5vh", marginBottom: ".5vh", opacity: 0.8, fontWeight: "normal", fontSize: "1.5vh", whiteSpace: "pre-line" }}>{description}</h5>
        </li>
      ))}
    </ul>
  );
}
