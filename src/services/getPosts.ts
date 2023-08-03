import { Post } from "../pages/posts/[post]";
import { read } from "to-vfile";

// todo: fetch from mongo db
export const _getPosts = async () => {
  let ecdsa_content = (await read("public/ecdsa.md")).toString();
  return [
    {
      post_title: "ECDSA",
      slug: "ecdsa",
      content: ecdsa_content,
    },
  ] as Post[];
};

export async function getPosts(): Promise<Map<string, Post>> {
  const posts = await _getPosts();
  const postsMap = new Map<string, Post>();
  posts.forEach((post) => postsMap.set(post.slug, post));
  return postsMap;
}
