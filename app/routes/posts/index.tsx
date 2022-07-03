import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/services/db";

type IData = {
  posts: {
    id: string | number;
    title: string;
    body: string;
  }[];
};

export const loader: LoaderFunction = async (): Promise<IData> => {
  const posts = await db.post.findMany();

  return { posts };
};

export default function Index() {
  const { posts } = useLoaderData<IData>();
  return (
    <>
      <h1>Posts</h1>
      <Link to="/posts/create">New post</Link>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <a href={`/posts/${post.id}`}>See</a>
        </div>
      ))}
    </>
  );
}
