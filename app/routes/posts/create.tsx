import {
  ActionFunction,
  ErrorBoundaryComponent,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { db } from "~/services/db";

const badRequest = (data: unknown) => json(data, { status: 400 });

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <div className="card-error">
    <strong>😢 something went wrong:</strong>
    <span>{error.message}</span>
  </div>
);

export const action: ActionFunction = async ({ request }) => {
  const form: FormData = await request.formData();
  const title: string = form.get("title") as any;
  const body: string = form.get("body") as any;
  const fields = { title, body };
  const errorField = {
    title: title.length < 3 ? "Title must be at least 10 characters" : null,
    body: body.length < 5 ? "Body must be at least 20 characters" : null,
  };
  const hasError = Object.values(errorField).some(Boolean);

  if (hasError) return badRequest({ errorField, fields });

  const post = await db.post.create({ data: fields });
  return redirect(`/posts/${post.id}`);
};

function PostCreate(): JSX.Element {
  const transition = useTransition();
  const actionData = useActionData();
  const { errorField } = actionData ?? {};
  const { title: titleErr, body: bodyErr } = errorField ?? {};
  return (
    <>
      <h2>Create new post</h2> <br />
      <Form method="post">
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            disabled={transition.state === "submitting"}
            className={titleErr ? "has-error" : ""}
            style={{ width: "100%" }}
          />
          {titleErr && <span className="error">{titleErr}</span>}
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <br />
          <textarea
            name="body"
            id="body"
            style={{ minWidth: "100%", minHeight: "150px" }}
            disabled={transition.state === "submitting"}
            className={bodyErr ? "has-error" : ""}
          />
          {bodyErr && <span className="error">{bodyErr}</span>}
        </div>
        <button type="submit" disabled={transition.state === "submitting"}>
          {transition.state === "submitting" ? "Creating..." : "Create"}
        </button>
      </Form>
    </>
  );
}

export default PostCreate;
