import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { getPosts } from "@/services/getPosts";
import remarkImages from "remark-images";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { setCDN } from "shiki";

export type Post = {
  post_title: string;
  slug: string;
  content: string;
};

export default function Page(props: { post: Post }) {
  return PostRenderer(props.post);
}

function ContentRenderer({ content }: { content: string }) {
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
      }}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

function PostRenderer(post: Post) {
  return (
    <div style={{ paddingBottom: "10rem" }}>
      <h1 style={{ textAlign: "center" }}>{post.post_title}</h1>
      <ContentRenderer content={post.content} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const posts = await getPosts();
  const slug = context.params.post;
  const maybe_post = posts.get(slug);

  return maybe_post === undefined
    ? { notFound: true }
    : { props: { post: maybe_post } };
}
