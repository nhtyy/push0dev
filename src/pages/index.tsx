import { posts, PostRegistry } from "@/services/getPosts";
import { PostList } from "@/componets/post_list";
import { LinkList } from "@/componets/link_list";

export default function Home({ registry }: { registry: PostRegistry }) {
  return (
    <div>
      <h2 className="homepage-section-header">Writing</h2>
      <p></p>
      <PostList registry={registry} />
      <h2 className="homepage-section-header">Contributions</h2>
      <LinkList
        links={[
          {
            title: "uniswapx-sdk-rs",
            description: "uniswapx api types, client and server written in rust",
            url: "https://github.com/nhtyy/uniswapx-sdk-rs",
          },
          {
            title: "v3-rs",
            description: "a uniswap v3 toolkit in rust",
            url: "https://github.com/nhtyy/v3-rs",
          },
          // {
          //   title: "reth",
          //   description: "a rust ethereum client",
          //   url: "https://github.com/paradigmxyz/reth/commits?author=nhtyy",
          // },
          // {
          //   title: "foundry",
          //   description: "a solidity testing framework written in rust",
          //   url: "https://github.com/foundry-rs/foundry/commits?author=nhtyy",
          // },
          {
            title: "lightning",
            description: "a L1 Blockchain for hosting edge services",
            url: "https://github.com/fleek-network/lightning/commits?author=nhtyy",
          },
          {
            title: "Alongside Finance",
            description: "An on chain crypto index protocol",
            url: "https://alongside.xyz",
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
