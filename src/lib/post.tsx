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
import Head from "next/head";

export async function processPost(
  file: any,
  title: string
): Promise<{ props: { title: string; stringified: string } }> {
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
    .process(file);

  return {
    props: {
      title,
      stringified: result.toString(),
    },
  };
}

export function PostRenderer(title: string, stringified: string) {
  return (
    <div style={{ paddingBottom: "10rem" }}>
      <Head>
        <title>{title}</title>
      </Head>
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
