import ECDSAPost from "../assets/ecdsa_post.json";
import RustErrs from "../assets/rust_err.json";
import { Post } from "../pages/posts/[post]";

// todo: fetch from mongo db
export const _getPosts = async () => {
  return [ECDSAPost, RustErrs] as Post[];
};

export async function getPosts(): Promise<Map<string, Post>> {
  const posts = await _getPosts();
  const postsMap = new Map<string, Post>();
  posts.forEach((post) => postsMap.set(post.slug, post));
  return postsMap;
}
