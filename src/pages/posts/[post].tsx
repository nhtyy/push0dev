import { useRouter } from "next/router";

type Post = {
  title: string;
  paragraphs: string[];
};

export default function Post(props: { post: Post; query: string }) {
  let post = props.post;
  let query = props.query;

  return <h1>{query}</h1>;
}

export async function getServerSideProps(context: any) {
  let { post } = context.params;

  // fetch posts, if not undefined, return props else return notFound

  return {
    props: {
      posts: [],
      query: context.params.post,
    },
  };
  // if (post === "about") {
  //   return {
  //     // returns the default 404 page with a status code of 404
  //     notFound: true,
  //   };
  // } else {
  //   return {
  //     props: {},
  //   };
  // }
}
