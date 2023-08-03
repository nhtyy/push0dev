import { Post } from "../pages/posts/[post]";
import { read } from "to-vfile";

// todo: fetch from mongo db
export const _getPosts = async () => {
  let ecdsa_content = (await read("src/assets/ecdsa.md")).toString();

  let rust_errros_content = (
    await read("src/assets/rust_errors.md")
  ).toString();

  return [
    {
      post_title: "ECDSA",
      slug: "ecdsa",
      content: ecdsa_content,
    },
    {
      post_title: "A Succint Introduction to Rust Errors",
      slug: "rust-errors",
      content: rust_errros_content,
    },
  ] as Post[];
};

export async function getPosts(): Promise<Map<string, Post>> {
  const posts = await _getPosts();
  const postsMap = new Map<string, Post>();
  posts.forEach((post) => postsMap.set(post.slug, post));
  return postsMap;
}
