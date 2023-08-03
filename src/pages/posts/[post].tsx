import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { getPosts } from "@/services/getPosts";
import { remark } from "remark";
import Head from "next/head";
import html from "remark-html";
import remarkImages from "remark-images";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { JsxElement } from "typescript";
import { setCDN } from "shiki";

function isImage(content: any): content is Image {
  return (content as Image).url !== undefined;
}

function isSection(content: any): content is Section {
  return (content as Section).title !== undefined;
}

type Image = {
  url: string;
};

type Section = {
  title: string;
  content: (string | Section | Image)[];
};

export type Post = {
  post_title: string;
  slug: string;
  sections: Section[];
};

type RenderedSection = {
  title: string;
  content: JsxElement[];
};

type RenderedPost = {
  post_title: string;
  slug: string;
};

type TableOfContents = {
  sections: {
    title: string;
    subsection_titles?: string[];
  }[];
};

export default function Page(props: { post: Post }) {
  return PostRenderer(props.post);
}

function SectionContent({
  content,
  depth,
}: {
  content: string;
  depth: number;
}) {
  const [renderedContent, setRenderedContent] = useState("");
  setCDN("/");

  useEffect(() => {
    const processContent = async () => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .use(remarkImages)
        .use(remarkGfm)
        .use(rehypePrettyCode, {
          theme: "github-dark-dimmed",
          keepBackground: true,
        })
        .process(content);
      setRenderedContent(result.toString());
    };

    processContent().catch(console.log);
  }, [content]);

  return (
    <div
      style={{
        textAlign: "left",
        marginLeft: (depth + 1).toString() + "rem",
      }}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

function Section({
  section,
  depth,
  sectionRefs,
}: {
  section: Section;
  depth: number;
  sectionRefs: { [key: string]: any };
}) {
  const sectionRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  sectionRefs[section.title] = sectionRef;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div key={section.title}>
      <h3
        style={{
          textAlign: "left",
          marginLeft: depth.toString() + "rem",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        className={"hover-red"}
        onClick={toggleCollapse}
        ref={sectionRef}
      >
        {isCollapsed ? "[+] " + section.title : section.title}
      </h3>
      <div
        style={{
          maxHeight: isCollapsed ? "0" : "2000px",
          opacity: isCollapsed ? "0" : "1",
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
      >
        {section.content.map((contentItem, index) => {
          if (typeof contentItem === "string") {
            return (
              <SectionContent key={index} content={contentItem} depth={depth} />
            );
          } else if (isImage(contentItem)) {
            return (
              <img
                key={index}
                src={contentItem.url}
                style={{ maxWidth: "100%" }}
              />
            );
          } else if (isSection(contentItem)) {
            return (
              <Section
                key={index}
                section={contentItem}
                depth={depth + 1}
                sectionRefs={sectionRefs}
              />
            );
          } else {
            console.log("Section Rendering Error: Unknown content item type");
            return null;
          }
        })}
      </div>
    </div>
  );
}

function scrollToRef(ref: React.MutableRefObject<HTMLInputElement>) {
  ref.current.scrollIntoView({ behavior: "smooth" });
}

function TableOfContentsRenderer(
  toc: TableOfContents,
  sectionRefs: { [key: string]: React.MutableRefObject<HTMLInputElement> }
) {
  return (
    <div style={{ textAlign: "left" }}>
      <ul style={{ listStyle: "none" }}>
        {toc.sections.map((section) => (
          <li key={section.title} style={{ paddingTop: ".5rem" }}>
            <a
              onClick={() => scrollToRef(sectionRefs[section.title])}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "large",
              }}
              className="hover-red"
            >
              {section.title}
            </a>
            {section.subsection_titles && (
              <ul style={{ listStyle: "none" }}>
                {section.subsection_titles.map((subsection) => (
                  <li key={subsection}>
                    <a
                      onClick={() => scrollToRef(sectionRefs[subsection])}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "large",
                      }}
                      className="hover-red"
                    >
                      {subsection}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
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
      {post.sections.map((section, index) => (
        <Section
          key={index}
          section={section}
          depth={0}
          sectionRefs={sectionRefs}
        />
      ))}
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
      if (isSection(item)) {
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
