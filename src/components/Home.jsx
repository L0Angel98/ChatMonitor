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
  useEffect(() => {
    testFetch();
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("messages", data => {
      setResp(data);
    });
  }, []);

  return <div>Hola Mundo</div>;
}
