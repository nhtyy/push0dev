import { posts, PostRegistry } from "@/services/getPosts";
import { LinkList } from "@/componets/link_list";

export default function Home({ registry }: { registry: PostRegistry }) {
  return (
    <div style={{ justifyContent: "center" }}>
      {/* <h2 className="homepage-section-header">About</h2> */}
      {/* <div style={{ width: "40vw", textAlign: "center", justifyContent: "center", margin: "auto" }}>
        <p style={{fontWeight: "normal", fontSize: "2vh"}}>
          mostly rust, math, ethereum, and open source
        </p>
      </div> */}
      <h2 className="homepage-section-header">Experience</h2>
      <LinkList
        links={[
          {
            title: "Symbiosis",
            position: "Founder and CEO",
            description: "Coming soon...",
            url: "https://symbiosis.markets",
            start: "Jan 2026",
            end: "Present",
          },
          {
            title: "Succinct Labs",
            description: "While at Succinct, I implemented and deployed novel cryptographic primitives as well focused on system design and optimization, including a custom RISC-V just-in-time compiled exeuction engine. \n\n My team and I were the first to achieve a full execution proof of a mainnet Ethereum block in under 12 seconds. Today, SP1 secures millions of dollars in user funds across multiple chains.",
            url: "https://github.com/succinctlabs/sp1",
            start: "Nov 2024",
            end: "Nov 2025",
            position: "Research Engineer",
          },
          {
            title: "Alongside Finance",
            description: "At Alongside, I spearheaded design and development of both the V1 and V2 smart contract protocols. Besides implementation, my work and research focused on novel rebalancing mechanisms and security.",
            url: "https://alongside.xyz",
            position: "Smart Contract Engineer",
            start: "Feb 2021",
            end: "Dec 2022",
          },
          {
            title: "Sentiment",
            description: "During my engagment with Sentiment, I helped build and design the V2 smart contract protocol on Hyperliquid. Most of my work involed implementation of the core risk engine, which was in charge of the solvency of the entire system, securing over $40M in user funds.",
            position: "Smart Contract Engineer",
            url: "https://github.com/sentimentxyz/protocol-v2",
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
