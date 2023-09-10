import { posts, PostRegistry } from "@/services/getPosts";
import { PostList } from "@/componets/post_list";
import { LinkList } from "@/componets/link_list";

export default function Home({ registry }: { registry: PostRegistry }) {
  return (
    <div>
      <h2 className="homepage-section-header">Writing</h2>
      <PostList registry={registry} />
      <h2 className="homepage-section-header">Open Source Work</h2>
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
      <h2 className="homepage-section-header">Contributions</h2>
      <LinkList
        links={[
          {
            title: "Reth: A Rust Ethereum client",
            url: "https://github.com/paradigmxyz/reth",
          },
          {
            title: "Foundry: A solidity testing framework written in rust",
            url: "https://github.com/foundry-rs/foundry",
          },
        ]}
      />
    </div>
  );
}

export async function getStaticProps() {
  const registry = posts();
  return {
    props: {
      registry,
    },
  };
}
