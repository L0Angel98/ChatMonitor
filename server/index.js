const express = require("express");
const app = express();
app.use(express.static(__dirname));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const port = process.env.PORT || 3001;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const messages = [
  {name: "Yo",message:"Hello"},
  {name: "Pam",message:"hi"}
]
io.on('connection', () => {
  console.log('a user connected');
});

app.get("/", (req, res) => {
  res.json({ message: "Hola esta es la pagina principal hola!" });
});

app.get('/messages', (req, res) => {
  res.send(messages);
});

app.post('/message', (req, res) => {
  messages.push(req.body);
  io.emit('message', req.body);
  console.log('Connected clients');
  res.sendStatus(200);
});

const server = app.listen(port, () => {
 const { port } = server.address();
 console.log(`Listening on port ${port}`);
});