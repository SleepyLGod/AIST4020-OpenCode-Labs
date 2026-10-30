import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const files = new Map([
  ["/", ["index.html", "text/html"]],
  ["/index.html", ["index.html", "text/html"]],
  ["/styles.css", ["styles.css", "text/css"]],
  ["/app.js", ["app.js", "text/javascript"]],
  ["/articles.js", ["articles.js", "text/javascript"]],
  ["/assets/book-open.svg", ["assets/book-open.svg", "image/svg+xml"]],
  ["/assets/trash-2.svg", ["assets/trash-2.svg", "image/svg+xml"]],
]);
const port = Number(process.env.PORT ?? 4173);
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const file = files.get(pathname);
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  if (!file) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const body = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, {
      "Content-Type": `${file[1]}; charset=utf-8`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    console.error(error.message);
    response.writeHead(500).end("Could not read the requested file");
  }
});
server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE"
    ? `Port ${port} is in use. Try PORT=${port + 1} npm start.` : error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Reading List: http://127.0.0.1:${server.address().port}`);
});
