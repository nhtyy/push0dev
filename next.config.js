const getHighlighter = require("shiki").getHighlighter;
const rehypePrettyCode = require("rehype-pretty-code");
const rehypeStringify = import("rehype-stringify");
const rehypeKatex = import("rehype-katex");
const remarkMath = import("remark-math");
const remarkImages = import("remark-images");
const remarkParse = import("remark-parse");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkParse, remarkMath, remarkImages],
    rehypePlugins: [
      rehypeKatex,
      rehypeStringify,
      [
        rehypePrettyCode,
        {
          theme: "github-dark-dimmed",
          keepBackground: true,
          getHighlighter: (opts) =>
            getHighlighter({
              ...opts,
              paths: {
                themes: "themes/",
                wasm: "dist/",
                languages: "languages/",
              },
            }),
        },
      ],
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
