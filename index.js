const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(`${__dirname}/public/`);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
