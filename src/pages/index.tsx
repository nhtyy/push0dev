import { posts, PostRegistry } from "@/services/getPosts";
import { LinkList } from "@/componets/link_list";

export default function Home({ registry }: { registry: PostRegistry }) {
  return (
    <div style={{justifyContent: "center"}}>
      <h2 className="homepage-section-header">About</h2>
      <div style={{ width: "40vw", textAlign: "center", justifyContent: "center", margin: "auto" }}>
        <p style={{fontWeight: "normal", fontSize: "2vh"}}>
          mostly rust, math, ethereum, and open source
        </p>
      </div>
      <h2 className="homepage-section-header">Contributions</h2>
      <LinkList
        links={[
          {
            title: "SP1 zkVM",
            description: "A blazing fast zero-knowledge virtual machine, written in Rust",
            url: "https://github.com/succinctlabs/sp1",
          },
          {
            title: "Alongside Finance",
            description: "An on-chain crypto index protocol",
            url: "https://alongside.xyz",
          },
          {
            title: "Sentiment V2",
            description: "On-chain leverage lending and borrowing",
            url: "https://github.com/sentimentxyz/protocol-v2",
          },
          {
            title: "Lightning",
            description: "An L1 Blockchain for hosting edge services",
            url: "https://github.com/fleek-network/lightning",
          },
        ]}
      />
      <h2 className="homepage-section-header">Distinctions</h2>
      <LinkList
        links={[
          {
            title: "Paradigm Fellow 2024",
            description: "",
            url: "https://www.paradigm.xyz/2024/06/paradigm-fellowship-2024",
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
