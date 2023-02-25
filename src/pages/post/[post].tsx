import { useRouter } from "next/router";

export default function Post() {
  let router = useRouter();
  let { post } = router.query;

  return <h1>{post}</h1>;
}
