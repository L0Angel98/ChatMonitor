import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

const testFetch = async () => {
  try {
    const resp = await axios.get("/api");
    console.log(resp.data.message);
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const [resp, setResp] = useState("");

  const handleClick = async () => {
    try {
      const resp = await axios.post("http://localhost:3001/message", {
        body: "Hola mundo",
        name: "getsemani"
      });
      console.log(resp);
    } catch (error) {}
  };

  useEffect(() => {
    testFetch();
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("messages", data => {
      console.log(data);
      setResp(data);
    });
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Send Message</button>Respuesta: {resp}
    </div>
  );
}
