import { _getPosts } from "@/services/getPosts";
import Link from "next/link";

export function PostList({ posts }: { posts: any[] }) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
      {posts.map((post) => (
        <li
          key={post.post_title}
          style={{ paddingTop: ".5rem", fontSize: "large" }}
        >
          <Link href={`/posts/${post.slug}`} className={"hover-red"}>
            {post.post_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
