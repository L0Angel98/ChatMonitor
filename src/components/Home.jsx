import React, { useEffect } from "react";
import axios from "axios";

const testFetch = async () => {
  try {
    const resp = await axios.get("/api");
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  useEffect(() => {
    testFetch();
  }, []);

  return <div>Hola Mundo</div>;
}
