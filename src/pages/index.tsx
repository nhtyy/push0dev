import { posts, PostRegistry } from "@/services/getPosts";
import { PostList } from "@/componets/post_list";
import { LinkList } from "@/componets/link_list";

export default function Home({ registry }: { registry: PostRegistry }) {
  return (
    <div style={{justifyContent: "center"}}>
      <h2 className="homepage-section-header">About</h2>
      <div style={{ width: "40vw", textAlign: "center", justifyContent: "center", margin: "auto" }}>
        <p style={{fontWeight: "normal", fontSize: "2vh"}}>
          mostly rust, math, ethereum, oss
        </p>
      </div>
      <h2 className="homepage-section-header">Contributions</h2>
      <LinkList
        links={[
          // {
          //   title: "uniswapx-sdk-rs",
          //   description: "uniswapx api types, client and server written in rust",
          //   url: "https://github.com/nhtyy/uniswapx-sdk-rs",
          // },
          // {
          //   title: "v3-rs",
          //   description: "a uniswap v3 toolkit in rust",
          //   url: "https://github.com/nhtyy/v3-rs",
          // },
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
            title: "Sentiment V2",
            description: "soon! on chain leverage lending and borrowing",
            url: "https://www.sentiment.xyz/",
          },
          {
            title: "Alongside Finance",
            description: "An on chain crypto index protocol",
            url: "https://alongside.xyz",
          },
          {
            title: "Lightning",
            description: "a L1 Blockchain for hosting edge services",
            url: "https://github.com/fleek-network/lightning/commits?author=nhtyy",
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
