const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (dataChunk) => {
      body.push(dataChunk);
    });

    return req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const userName = parsedData.split("=")[1];
      res.statusCode = 302;
      res.setHeader("Location", "/");
      console.log(userName);
      return res.end();
    });
  }

  if (url === "/users") {
    res.write("<html><head><title>My Assignment for Section 3</title></head><body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body></html>");
    return res.end();
  }
  res.write("<html>")
  res.write("<head><title>My Assignment for Section 3</title></head>")
  res.write("<body>")
  res.write("<h1>Greetings from Node Assignment in Section 3!</h1>");
  res.write(
    '<form action="/create-user" method="POST" message="userName"><input type="text" name="userName"/><button type="submit">Sign up!</button></form>'
  );
  res.write("</body>")
  res.write("</html>")
  return res.end();
});

server.listen(3000);
