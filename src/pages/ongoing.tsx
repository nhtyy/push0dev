export default function Contact() {
  return (
    <div className="about">
      <h2 className="about-tag" style={{ marginBottom: "0" }}>
        ongoing
      </h2>

      {makeList([
        {
          item: "fleek",
          link: "https://fleek.xyz",
          description: "decentralized edge network, core network dev",
        },
        {
          item: "myriad",
          link: "https://myriad.info",
          description: "on chain market making, technical lead",
        },
      ])}
    </div>
  );
}

function makeList(
  items: {
    item: string;
    link: string;
    description: string[] | string;
  }[]
) {
  // make sure items are in the correct format
  items = items.map((item) => {
    if (typeof item.description === "string") {
      item.description = [item.description];
    }

    return item;
  });

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, i) => (
        <li key={i}>
          <a href={item.link}>
            <u>{item.item}</u>
          </a>
          <ul style={{ textAlign: "left" }}>
            {(item.description as string[]).map((description, i) => (
              <li key={i} style={{ listStyle: "none", paddingBottom: "1vh" }}>
                {description}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
