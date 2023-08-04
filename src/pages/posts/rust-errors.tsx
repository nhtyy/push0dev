import { PostRenderer, processPost } from "@/lib/post";
import { readFileSync } from "fs";
import path from "path";

export default function RustErrors(props: {
  title: string;
  stringified: string;
}) {
  const { title, stringified } = props;
  return PostRenderer(title, stringified);
}

export async function getStaticProps() {
  let _path = path.join(process.cwd(), "posts", "rust_errors.md");
  let content = readFileSync(_path).toString();
  return processPost(content, "A Short Intro to Rust Errors");
}
