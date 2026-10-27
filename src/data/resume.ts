// Edit the content of the homepage here.
//
// Each entry needs a `title` and a `url`. Everything else is optional:
//   position     shown in italics under the title
//   start / end  shown on the right of the title (both are needed)
//   description  a list of paragraphs, one string per paragraph

export type Entry = {
  title: string;
  url: string;
  position?: string;
  start?: string;
  end?: string;
  description?: string[];
};

export const experience: Entry[] = [
  {
    title: "Symbiosis",
    url: "https://symbiosis.markets",
    position: "Founder and CEO",
    start: "Jan 2026",
    end: "Present",
    description: [
      "A next-generation prime brokerage, bringing on-chain instruments to your traditional brokerage account.",
      "Today, Symbiosis supports block trading and portfolio margining for on-chain event contracts.",
    ],
  },
  {
    title: "Succinct Labs",
    url: "https://github.com/succinctlabs/sp1",
    position: "Research Engineer",
    start: "Nov 2024",
    end: "Nov 2025",
    description: [
      "While at Succinct, I implemented and deployed novel cryptographic primitives as well focused on system design and optimization, including a custom RISC-V just-in-time compiled execution engine.",
      "My team and I were the first to achieve a full execution proof of a mainnet Ethereum block in under 12 seconds. Today, SP1 secures millions of dollars in user funds across multiple chains.",
    ],
  },
  {
    title: "Alongside Finance",
    url: "https://alongside.xyz",
    position: "Smart Contract Engineer",
    start: "Feb 2021",
    end: "Dec 2022",
    description: [
      "At Alongside, I spearheaded design and development of both the V1 and V2 smart contract protocols. Besides implementation, my work and research focused on novel rebalancing mechanisms and security.",
    ],
  },
  {
    title: "Sentiment",
    url: "https://github.com/sentimentxyz/protocol-v2",
    position: "Smart Contract Engineer",
    description: [
      "During my engagement with Sentiment, I helped build and design the V2 smart contract protocol on Hyperliquid. Most of my work involved implementation of the core risk engine, which was in charge of the solvency of the entire system, securing over $40M in user funds.",
    ],
  },
];

export const distinctions: Entry[] = [
  {
    title: "Paradigm Fellow 2024",
    url: "https://www.paradigm.xyz/2024/06/paradigm-fellowship-2024",
  },
];
