import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { db } from "~/services/db";

export default function Index() {
  return (
    <div>
      <h2>Hello world</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
        error eos ducimus dolorum vero asperiores modi iure omnis earum
        architecto? Saepe ipsa explicabo quos quasi esse asperiores, soluta vero
        inventore?
      </p>
      <ul>
        <li>
          <Link to="/about">go to about page</Link>
        </li>
        <li>
          <Link to="/posts/create">go to post create page</Link>
        </li>
        <li>
          <Link to="/posts">go to post list page</Link>
        </li>
      </ul>
    </div>
  );
}
