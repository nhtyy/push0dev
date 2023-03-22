import React from "react";
import { useRef } from "react";
import { getPosts } from "@/services/getPosts";

type Section = {
  title: string;
  content: (string | Section)[];
};

export type Post = {
  post_title: string;
  slug: string;
  sections: Section[];
};

type TableOfContents = {
  sections: {
    title: string;
    subsection_titles?: string[];
  }[];
};

export default function Post(props: { post: Post }) {
  return PostRenderer(props.post);
}

function renderSection(
  section: Section,
  depth: number = 0,
  sectionRefs: { [key: string]: any }
) {
  const sectionRef = useRef(null);
  sectionRefs[section.title] = sectionRef;

  return (
    <div key={section.title} ref={sectionRef}>
      <h3
        style={{
          textAlign: "left",
          marginLeft: depth.toString() + "rem",
          textDecoration: "underline",
        }}
      >
        {section.title}
      </h3>
      {section.content.map((contentItem) =>
        typeof contentItem === "string" ? (
          <p
            style={{
              textAlign: "left",
              marginLeft: (depth + 1).toString() + "rem",
            }}
            key={Math.random()}
          >
            {contentItem}
          </p>
        ) : (
          renderSection(contentItem, depth + 1, sectionRefs)
        )
      )}
    </div>
  );
}

function scrollToRef(ref: React.MutableRefObject<HTMLInputElement>) {
  console.log(ref.current);
  ref.current.scrollIntoView({ behavior: "smooth" });
}

function TableOfContentsRenderer(
  toc: TableOfContents,
  sectionRefs: { [key: string]: React.MutableRefObject<HTMLInputElement> }
) {
  return (
    <div style={{ textAlign: "left" }}>
      <ol>
        {toc.sections.map((section) => (
          <li key={section.title}>
            <a
              href="#"
              onClick={() => scrollToRef(sectionRefs[section.title])}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              {section.title}
            </a>
            {section.subsection_titles && (
              <ul>
                {section.subsection_titles.map((subsection) => (
                  <li key={subsection}>
                    <a
                      onClick={() => scrollToRef(sectionRefs[subsection])}
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      {subsection}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PostRenderer(post: Post) {
  const toc = extractTableOfContents(post);

  let sectionRefs = {};
  return (
    <div style={{ paddingBottom: "10rem" }}>
      <h1 style={{ textAlign: "center" }}>{post.post_title}</h1>
      {TableOfContentsRenderer(toc, sectionRefs)}
      {post.sections.map((section) => renderSection(section, 0, sectionRefs))}
    </div>
  );
}

function extractTableOfContents(post: Post): TableOfContents {
  const tableOfContents: TableOfContents = {
    sections: [],
  };

  const extractSubsections = (section: Section): string[] => {
    const subsectionTitles: string[] = [];

    section.content.forEach((item) => {
      if (typeof item !== "string") {
        subsectionTitles.push(item.title);
        subsectionTitles.push(...extractSubsections(item));
      }
    });

    return subsectionTitles;
  };

  post.sections.forEach((section) => {
    const subsections = extractSubsections(section);
    const tocSection = {
      title: section.title,
      subsection_titles: subsections.length > 0 ? subsections : undefined,
    };
    tableOfContents.sections.push(tocSection);
  });

  return tableOfContents;
}

export async function getServerSideProps(context: any) {
  const posts = await getPosts();
  const slug = context.params.post;
  const maybe_post = posts.get(slug);
  return maybe_post === undefined
    ? { notFound: true }
    : { props: { post: maybe_post } };
}
