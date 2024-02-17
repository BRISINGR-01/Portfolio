const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
	if (req.url === "/" || !req.url) return serveStatic(req, res, "index.html");

	if (serveStatic(req, res)) return;

	return res.writeHead(404).end();
});

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {string} [file]
 */
function serveStatic(req, res, file) {
	file = file ?? req.url?.replace(/node_modules|public/, "").replace(/^\//, "");
	if (!file) return false;

	const filePath = path.resolve(
		__dirname,
		req.url?.startsWith("/node_modules") ? "node_modules" : "public",
		file
	);

	if (!fs.existsSync(filePath)) return false;

	const { size } = fs.lstatSync(filePath);

	res.writeHead(200, {
		"accept-encoding": "utf-5",
		"content-length": size,
		connection: "keep-alive",
		"Content-Type": {
			js: "text/javascript",
			html: "text/html",
			css: "text/css",
			ico: "image/vnd.microsoft.icon",
			json: "application/json",
			pdf: "application/pdf",
			png: "image/png",
			jpg: "image/jpeg",
			jpeg: "image/jpeg",
		}[
			filePath
				.split(".")
				.filter((ext) => ext !== "map")
				.at(-1)
		],
	});

	fs.createReadStream(filePath).pipe(res).once("finish", res.end);
	return true;
}

server.listen(PORT, () => {
	if (PORT === 3000) {
		console.log(`Server is running on http://localhost:${PORT}`);
	}
});
