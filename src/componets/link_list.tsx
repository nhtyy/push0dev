import { _getPosts } from "@/services/getPosts";
import Link from "next/link";

export function LinkList({
  links,
}: {
  links: { title: string; url: string }[];
}) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
      {links.map(({ title, url }) => (
        <li key={title} style={{ paddingTop: ".3rem", fontSize: "large" }}>
          <a href={url} className={"hover-red"}>
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
}
