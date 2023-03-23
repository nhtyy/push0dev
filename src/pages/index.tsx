import { _getPosts } from "@/services/getPosts";
import { Post } from "./posts/[post]";
import { PostList } from "@/componets/post_list";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <PostList posts={posts} />
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
