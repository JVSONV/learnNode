const fs = require('fs');

const requestHandler = (req, res) => {

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html"); // your response back to the browser
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end(); // ending your response that is sent back to the browser
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (dataChunk) => {
      body.push(dataChunk);
    });
    return req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const message = parsedData.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        if(err) return err;
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html"); // your response back to the browser
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("</html>");
  res.end(); // ending your response that is sent back to the browser
  //process.exit();

}

module.exports = requestHandler;