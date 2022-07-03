import { ErrorBoundaryComponent, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/services/db";

export const loader: LoaderFunction = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  });

  return {
    post,
  };
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <div className="card-error">
    <strong>😢 something went wrong:</strong>
    <span>{error.message}</span>
  </div>
);

export default function SinglePost(): JSX.Element {
  const { post } = useLoaderData();
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
}
