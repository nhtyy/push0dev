import React from "react";
import { useRef } from "react";
import axios from "axios";

// test sections
const sections: Section[] = [
  {
    title: "Section 1",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at erat eros. Donec faucibus velit id est lobortis sagittis. Ut non molestie quam. Morbi gravida pellentesque dignissim. Curabitur vitae arcu placerat, mattis mi at, viverra massa. Nam fringilla tristique neque non molestie. Morbi semper sem nisi, ut feugiat arcu pharetra vel. Morbi erat purus, dictum eu aliquet at, laoreet lobortis mauris. Aliquam mollis risus lorem, rhoncus pellentesque magna eleifend at. Curabitur a imperdiet diam. Maecenas commodo urna ac lorem sodales, in porta dui aliquet. Aenean lacinia, nunc vel commodo pellentesque, augue urna volutpat risus, vel efficitur nibh justo eu mauris. Phasellus quam lacus, pellentesque a libero et, eleifend ornare ante. In gravida massa arcu, quis laoreet metus auctor at.",
    ],
  },
  {
    title: "Section 2",
    content: [
      "Phasellus eu nibh vel justo porta tincidunt ut vitae purus. Donec vitae congue metus, sed ultricies elit. Sed euismod maximus varius. Morbi quis tempor est, non laoreet felis. Nunc facilisis sapien ut iaculis rhoncus. Duis elementum rhoncus mauris vel ultrices. Praesent porta feugiat enim, ac ultricies leo semper sit amet. Suspendisse aliquet augue et urna euismod, in pretium nibh elementum. Pellentesque aliquet, elit id ultrices tristique, massa est facilisis quam, vel aliquet purus erat eu augue. Sed commodo nisl vitae interdum gravida. Praesent semper semper sagittis. Fusce et nisi erat.",
      "Phasellus eu nibh vel justo porta tincidunt ut vitae purus. Donec vitae congue metus, sed ultricies elit. Sed euismod maximus varius. Morbi quis tempor est, non laoreet felis. Nunc facilisis sapien ut iaculis rhoncus. Duis elementum rhoncus mauris vel ultrices. Praesent porta feugiat enim, ac ultricies leo semper sit amet. Suspendisse aliquet augue et urna euismod, in pretium nibh elementum. Pellentesque aliquet, elit id ultrices tristique, massa est facilisis quam, vel aliquet purus erat eu augue. Sed commodo nisl vitae interdum gravida. Praesent semper semper sagittis. Fusce et nisi erat.",
    ],
  },
  {
    title: "Section 3",
    content: [
      "Phasellus eu nibh vel justo porta tincidunt ut vitae purus. Donec vitae congue metus, sed ultricies elit. Sed euismod maximus varius. Morbi quis tempor est, non laoreet felis. Nunc facilisis sapien ut iaculis rhoncus. Duis elementum rhoncus mauris vel ultrices. Praesent porta feugiat enim, ac ultricies leo semper sit amet. Suspendisse aliquet augue et urna euismod, in pretium nibh elementum. Pellentesque aliquet, elit id ultrices tristique, massa est facilisis quam, vel aliquet purus erat eu augue. Sed commodo nisl vitae interdum gravida. Praesent semper semper sagittis. Fusce et nisi era",
      {
        title: "Section 3.1",
        content: [
          "Morbi euismod at nunc quis placerat. Nullam ac elementum tortor, id feugiat tortor. Donec aliquam risus est. Etiam in urna sit amet arcu porttitor feugiat. Morbi eleifend ante sodales dapibus tincidunt. Integer dapibus iaculis quam et venenatis. Ut tincidunt massa vel euismod placerat. Nullam gravida vel eros vitae sodales. Maecenas nec varius velit. Donec urna metus, vestibulum ut urna nec, tempor fringilla massa. Vestibulum lacinia sed nibh at aliquet. Mauris fermentum a enim a semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin vestibulum sem id turpis rutrum luctus. In metus arcu, suscipit ac fermentum et, condimentum at nunc.",
          {
            title: "Section 3.1.1",
            content: [
              "Sed et augue dui. Praesent non pulvinar ipsum. Nunc porta aliquet sapien, sit amet euismod risus commodo et. Suspendisse a luctus tellus. Curabitur laoreet ullamcorper aliquam. Curabitur hendrerit ipsum tellus, eu euismod quam luctus sed. Praesent rutrum, metus quis mollis semper, augue mauris dapibus mauris, tincidunt tincidunt felis nunc nec diam. Fusce vehicula viverra turpis, ac lacinia diam pharetra sed. Nulla facilisi. Nulla ut massa mollis, elementum enim at, malesuada lorem. Nullam iaculis, tellus eu aliquam varius, enim justo tincidunt elit, non varius elit dui eget risus. Suspendisse bibendum tellus a felis ullamcorper ultrices. Donec at vestibulum sem. In sapien odio, cursus vitae varius id, sollicitudin eget dui.",
            ],
          },
        ],
      },
      {
        title: "Section 3.2",
        content: [
          "Phasellus eu nibh vel justo porta tincidunt ut vitae purus. Donec vitae congue metus, sed ultricies elit. Sed euismod maximus varius. Morbi quis tempor est, non laoreet felis. Nunc facilisis sapien ut iaculis rhoncus. Duis elementum rhoncus mauris vel ultrices. Praesent porta feugiat enim, ac ultricies leo semper sit amet. Suspendisse aliquet augue et urna euismod, in pretium nibh elementum. Pellentesque aliquet, elit id ultrices tristique, massa est facilisis quam, vel aliquet purus erat eu augue. Sed commodo nisl vitae interdum gravida. Praesent semper semper sagittis. Fusce et nisi erat.",
          "Phasellus eu nibh vel justo porta tincidunt ut vitae purus. Donec vitae congue metus, sed ultricies elit. Sed euismod maximus varius. Morbi quis tempor est, non laoreet felis. Nunc facilisis sapien ut iaculis rhoncus. Duis elementum rhoncus mauris vel ultrices. Praesent porta feugiat enim, ac ultricies leo semper sit amet. Suspendisse aliquet augue et urna euismod, in pretium nibh elementum. Pellentesque aliquet, elit id ultrices tristique, massa est facilisis quam, vel aliquet purus erat eu augue. Sed commodo nisl vitae interdum gravida. Praesent semper semper sagittis. Fusce et nisi erat.",
        ],
      },
    ],
  },
];

const post: Post = {
  post_title: "Test Post",
  sections: sections,
};

type Section = {
  title: string;
  content: (string | Section)[];
};

type Post = {
  post_title: string;
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

export async function getServerSideProps() {
  // fetch posts, if not undefined, return props else return notFound

  return {
    props: {
      post: post,
    },
  };
  // if (post === "about") {
  //   return {
  //     // returns the default 404 page with a status code of 404
  //     notFound: true,
  //   };
  // } else {
  //   return {
  //     props: {},
  //   };
  // }
}
