import { _getPosts } from "@/services/getPosts";
import { Post } from "@/pages/posts/[post]";
import Link from "next/link";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
      {posts.map((post) => (
        <li
          key={post.post_title}
          style={{ paddingTop: ".3rem", fontSize: "large" }}
        >
          <Link href={`/posts/${post.slug}`} className={"hover-red"}>
            {post.post_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
