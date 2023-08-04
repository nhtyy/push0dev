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
import {
  getHighlighter,
  BUNDLED_LANGUAGES,
  HighlighterOptions,
  setCDN,
} from "shiki";
import { useEffect, useState } from "react";

export type Post = {
  post_title: string;
  slug: string;
  content: string;
};

export default function Page(props: { post: Post }) {
  return PostRenderer(props.post);
}

// function ContentRenderer({ content }: { content: string }) {
//   let [renderedContent, setRenderedContent] = useState("");

//   setCDN("/");

//   useEffect(() => {
//     const [renderedContent, setRenderedContent] = useState("");

//     useEffect(() => {
//       const processContent = async () => {
//         const result = await unified()
//           .use(remarkParse)
//           .use(remarkMath)
//           .use(remarkRehype)
//           .use(rehypeKatex)
//           .use(rehypeStringify)
//           .use(remarkImages)
//           .process(content);
//         setRenderedContent(result.toString());
//       };

//       processContent().catch(console.error);
//     }, [content]);
//   }, [content]);

//   return (
//     <div
//       style={{
//         textAlign: "left",
//       }}
//       dangerouslySetInnerHTML={{ __html: renderedContent }}
//     />
//   );
// }

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

    processContent().catch(console.error);
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

  if (maybe_post != undefined) {
    // const result = await unified()
    //   .use(remarkParse)
    //   .use(remarkMath)
    //   .use(remarkRehype)
    //   .use(rehypeKatex)
    //   .use(rehypeStringify)
    //   .use(remarkImages)
    //   .use(remarkGfm)
    //   .use(rehypePrettyCode, {
    //     theme: "github-dark-dimmed",
    //     keepBackground: true,
    //     getHighlighter: (opt: HighlighterOptions) =>
    //       getHighlighter({
    //         ...opt,
    //         paths: {
    //           themes: "themes/",
    //           wasm: "dist/",
    //           languages: "languages/",
    //         },
    //       }),
    //   })
    //   .process(maybe_post.content);

    return {
      props: {
        post: {
          post_title: maybe_post.post_title,
          slug: maybe_post.slug,
          content: maybe_post.content,
        },
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
