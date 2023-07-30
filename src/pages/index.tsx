import { _getPosts } from "@/services/getPosts";
import { Post } from "./posts/[post]";
import { PostList } from "@/componets/post_list";
import Link from "next/link";
import { LinkList } from "@/componets/link_list";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h2>Writing</h2>
      <PostList posts={posts} />
      <h2>Open Source Work</h2>
      <LinkList
        links={[
          {
            title: "uniswapx-sdk-rs: uniswapx infra written in rust",
            url: "https://github.com/nhtyy/uniswapx-sdk-rs",
          },
          {
            title: "v3-rs: a uniswap v3 toolkit in rust",
            url: "https://github.com/nhtyy/v3-rs",
          },
        ]}
      />
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
