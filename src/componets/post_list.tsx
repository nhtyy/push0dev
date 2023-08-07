import { PostRegistry } from "@/services/getPosts";
import Link from "next/link";

export function PostList({ registry }: { registry: PostRegistry }) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
      {Object.keys(registry).map((slug) => (
        <li
          key={registry[slug]}
          style={{ paddingTop: ".5rem", fontSize: "large" }}
        >
          <Link href={`/posts/${slug}`} className={"hover-red"}>
            {registry[slug]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
