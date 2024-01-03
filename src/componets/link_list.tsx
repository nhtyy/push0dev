export function LinkList({
  links,
}: {
  links: { title: string; description: string, url: string }[];
}) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
      {links.map(({ title, description, url }) => (
        <li key={title} style={{ fontSize: "2.5vh" }}>
          <a href={url} className={"hover-red"}>
            {title}
          </a>
          <br/>
          <h5 style={{marginTop: "1vh", marginBottom: "1.5vh", fontWeight: "normal"}}>{description}</h5>
          {/* <p style={{marginTop: "1vh", marginBottom: "1.5vh"}}>{description}</p> */}
        </li>
      ))}
    </ul>
  );
}
