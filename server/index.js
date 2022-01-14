const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.static(__dirname));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3001;
let sio = require("socket.io");
const uri = "mongodb+srv://Victoria:victoria123@clustermdb.tpa0e.mongodb.net/ClusterMdb?retryWrites=true&w=majority"

var Message;
async function connectMongoose() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("mongoose connected..")
    })
    require("./Message")
    Message = mongoose.model("Message")
}

async function initialLoad() {
  await connectMongoose();
}

initialLoad()

const server = app.listen(port, () => {
  const { port } = server.address();
  console.log(`Listening on port ${port}`);
});

let io = sio(server);

io.on("connection", () => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.json({ message: "Hola esta es la pagina principal hola!" });
});

app.get("/messages", (req, res) => {
  Message.find().then((messages) => {
		console.log("Get messages From DB")
		res.send(messages)
	}).catch((err) => {
		if(err) {
			throw err
		}
	})
});

app.post("/message", (req, res) => {
  io.emit(`message`, req.body);
  const newMessage = {
		"name":req.body.name,
		"message": req.body.message
	}
	// Create new Message instance..
	const message = new Message(newMessage)
	message.save().then((r) => {
		res.send("Message sent..")
	}).catch( (err) => {
		if(err) {
			throw err
		}
	})
});
