import { PostRenderer, processPost } from "@/lib/post";
import { posts } from "@/services/getPosts";
import { readFileSync } from "fs";
import path from "path";

export default function Post(props: { title: string; stringified: string }) {
  const { title, stringified } = props;
  return PostRenderer(title, stringified);
}

// export async function getServerSideProps(ctx: any) {
//   let slug = ctx.params.post;

//   let registry = posts();

//   let slugs = Object.keys(registry);

//   // check if the slug is valid post
//   if (!slugs.includes(slug)) {
//     return {
//       notFound: true,
//     };
//   }

//   let _path = path.join(process.cwd(), "posts", `${slug}.md`);
//   let content = readFileSync(_path).toString();

//   return processPost(content, registry[slug]);
// }

export async function getStaticProps({ params }: { params: any }) {
  let content = readFileSync(
    path.join(process.cwd(), "posts", `${params.post}.md`)
  ).toString();

  console.log(params);

  return processPost(content, posts()[params.post]);
}

export async function getStaticPaths() {
  let registry = posts();
  let slugs = Object.keys(registry);

  return {
    paths: slugs.map((slug) => ({
      params: {
        post: slug,
      },
    })),
    fallback: false,
  };
}
