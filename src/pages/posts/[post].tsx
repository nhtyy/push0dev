import { PostRenderer, processPost } from "@/lib/post";
import { posts } from "@/services/getPosts";
import { readFileSync } from "fs";
import path from "path";

export default function Post(props: { title: string; stringified: string }) {
  const { title, stringified } = props;
  return PostRenderer(title, stringified);
}

export async function getServerSideProps(ctx: any) {
  let slug = ctx.params.post;

  let registry = posts();

  let slugs = Object.keys(registry);

  // check if the slug is valid post
  if (!slugs.includes(slug)) {
    return {
      notFound: true,
    };
  }

  let _path = path.join(process.cwd(), "posts", `${slug}.md`);
  let content = readFileSync(_path).toString();

  return processPost(content, registry[slug]);
}
