import TestPost from "../assets/test_post.json";
import { Post } from "../pages/posts/[post]";

export const _getPosts = async () => {
  return [TestPost] as Post[];
};

export async function getPosts(): Promise<Map<string, Post>> {
  const posts = await _getPosts();
  const postsMap = new Map<string, Post>();
  posts.forEach((post) => postsMap.set(post.slug, post));
  return postsMap;
}
