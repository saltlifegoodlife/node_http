const http = require("http");
const PORT = 3000;

http
  .createServer((request, response) => {
    const url = request.url;
    const method = request.method;
    response.setHeader("content-type", "text/html");
    const chunksArray = [];
    request.on("data", (chunk) => {
      chunksArray.push(chunk);
    });
    request.on("end", () => {
      const body = JSON.parse(Buffer.concat(chunksArray).toString());
      const responseBody = { method, url, body };
      if (url == "/") {
        response.write("Home Page");
      } else if (url == "/about") {
        response.write(
          JSON.stringify({ name: "Ross", age: 33, hobby: "kayak fishing" })
        );
      } else if (url == "/echo") {
        response.write(JSON.stringify(responseBody));
      }
      response.end();
    });
  })
  .listen(PORT, () => {
    console.log(`server is listening at local host ${PORT} port`);
  });
