import { _getPosts } from "@/services/getPosts";
import { Post } from "./posts/[post]";
import { PostList } from "@/componets/post_list";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h2>Writing</h2>
      <PostList posts={posts} />
      <h2>Open Source Work</h2>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await _getPosts();
  return {
    props: {
      posts,
    },
  };
}
