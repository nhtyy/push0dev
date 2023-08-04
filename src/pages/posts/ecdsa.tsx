import remarkImages from "remark-images";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getHighlighter, HighlighterOptions } from "shiki";
import path from "path";
import { readFileSync } from "fs";

export type Post = {
  post_title: string;
  slug: string;
  path: string;
};

export default function ECDSA(props: { title: string; stringified: string }) {
  //                        ^^ change this
  const { title, stringified } = props;
  return PostRenderer(title, stringified);
}

function PostRenderer(title: string, stringified: string) {
  return (
    <div style={{ paddingBottom: "10rem" }}>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <div
        style={{
          textAlign: "left",
        }}
        dangerouslySetInnerHTML={{ __html: stringified }}
      />
    </div>
  );
}

export async function getServerSideProps(_ctx: any) {
  let _path = path.join(process.cwd(), "posts", "ecdsa.md"); // <-------- change this
  let content = readFileSync(_path).toString();

  console.error("working path", process.cwd());

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
      getHighlighter: (opt: HighlighterOptions) =>
        getHighlighter({
          ...opt,
          paths: {
            themes: "themes/",
            wasm: "dist/",
            languages: "languages/",
          },
        }),
    })
    .process(content);

  return {
    props: {
      title: "ECDSA", // <-------- change this
      stringified: result.toString(),
    },
  };
}

// export async function getStaticProps() {
//   let _path = path.join(process.cwd(), "posts", "ecdsa.md"); // <-------- change this
//   let content = readFileSync(_path).toString();

//   const result = await unified()
//     .use(remarkParse)
//     .use(remarkMath)
//     .use(remarkRehype)
//     .use(rehypeKatex)
//     .use(rehypeStringify)
//     .use(remarkImages)
//     .use(remarkGfm)
//     .use(rehypePrettyCode, {
//       theme: "github-dark-dimmed",
//       keepBackground: true,
//       getHighlighter: (opt: HighlighterOptions) =>
//         getHighlighter({
//           ...opt,
//           paths: {
//             themes: "themes/",
//             wasm: "dist/",
//             languages: "languages/",
//           },
//         }),
//     })
//     .process(content);

//   return {
//     props: {
//       title: "ECDSA", // <-------- change this
//       stringified: result.toString(),
//     },
//   };
// }
