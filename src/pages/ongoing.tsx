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
        {
          item: "v3-rs refactor",
          link: "https://github.com/nhtyy/v3-rs",
          description: [
            "v3-rs was one of the very first things i ever wrote in rust and its not great",
            "After using it internally many times, I have enough data to make a solid attempt at publishing it as a crate",
          ],
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
