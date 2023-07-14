const http = require("http");
const fs = require("fs/promises");
const url = require("url");

const handleRequest = async (req, res) => {
  const q = url.parse(req.url, true);
  let filePath = q.pathname === "/" ? "./index.html" : `.${q.pathname}.html`;

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
  } catch (err) {
    const notFoundPage = await fs.readFile("./404.html");
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(notFoundPage);
  }

  res.end();
};

http.createServer(handleRequest).listen(8080);
