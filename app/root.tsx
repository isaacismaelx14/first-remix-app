import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import GlobalStyles from "~/styles/global.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "My First Remix App",
  viewport: "width=device-width,initial-scale=1",
  description: "My first Remix app",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: GlobalStyles,
  },
  {
    rel: "stylesheet",
    href: "https://cdn.simplecss.org/simple.min.css",
  }
];

function Layout() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>App</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© {new Date().getFullYear()} By Isaac</footer>
    </>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
