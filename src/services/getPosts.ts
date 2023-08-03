// import ECDSAPost from "../assets/ecdsa_post.json";
// import RustErrs from "../assets/rust_err.json";
import { Post } from "../pages/posts/[post]";
import { read } from "to-vfile";

// todo: fetch from mongo db
export const _getPosts = async () => {
  let testmd_content = (await read("src/assets/testmd.md")).toString();
  return [
    {
      post_title: "testmd",
      slug: "testmd",
      content: testmd_content,
    },
  ] as Post[];
};

export async function getPosts(): Promise<Map<string, Post>> {
  const posts = await _getPosts();
  const postsMap = new Map<string, Post>();
  posts.forEach((post) => postsMap.set(post.slug, post));
  return postsMap;
}
