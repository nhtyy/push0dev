import { PostRenderer, processPost } from "@/lib/post";
import { readFileSync } from "fs";
import path from "path";

export default function ECDSA(props: { title: string; stringified: string }) {
  //                        ^^ change this
  const { title, stringified } = props;
  return PostRenderer(title, stringified);
}

export async function getStaticProps() {
  let _path = path.join(process.cwd(), "posts", "ecdsa.md");
  let content = readFileSync(_path).toString();
  return processPost(content, "ECDSA");
}
