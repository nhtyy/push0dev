import { readFileSync } from "fs";
import path from "path";

// todo: fetch from mongo db
export const _getPosts = async () => {
  return [
    {
      post_title: "ECDSA",
      slug: "ecdsa",
    },
    {
      post_title: "A Succint Introduction to Rust Errors",
      slug: "rust-errors",
    },
  ];
};

// export async function getPosts(): Promise<Map<string, Post>> {
//   const posts = await _getPosts();
//   const postsMap = new Map<string, Post>();
//   posts.forEach((post) => postsMap.set(post.slug, post));
//   return postsMap;
// }
