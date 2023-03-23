import TestPost from "../assets/test_post.json";
import ECDSAPost from "../assets/ecdsa_post.json";
import { Post } from "../pages/posts/[post]";

export const _getPosts = async () => {
  return [TestPost, ECDSAPost] as Post[];
};

export async function getPosts(): Promise<Map<string, Post>> {
  const posts = await _getPosts();
  const postsMap = new Map<string, Post>();
  posts.forEach((post) => postsMap.set(post.slug, post));
  return postsMap;
}
