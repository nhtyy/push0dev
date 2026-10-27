import { posts, PostRegistry } from "@/services/getPosts";
import { LinkList } from "@/componets/link_list";
import { experience, distinctions } from "@/data/resume";

export default function Home({ registry }: { registry: PostRegistry }) {
  return (
    <>
      {/* <h2 className="homepage-section-header">About</h2> */}
      {/* <div style={{ width: "40vw", textAlign: "center", justifyContent: "center", margin: "auto" }}>
        <p style={{fontWeight: "normal", fontSize: "2vh"}}>
          mostly rust, math, ethereum, and open source
        </p>
      </div> */}
      <section>
        <h2 className="section-header">Experience</h2>
        <LinkList links={experience} />
      </section>
      <section>
        <h2 className="section-header">Distinctions</h2>
        <LinkList links={distinctions} />
      </section>
    </>
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
