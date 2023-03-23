import { _getPosts } from "@/services/getPosts";
import { Post } from "./posts/[post]";
import { PostList } from "@/componets/post_list";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h3>Writing</h3>
      <PostList posts={posts} />
      <h3>Open Source Work</h3>
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
