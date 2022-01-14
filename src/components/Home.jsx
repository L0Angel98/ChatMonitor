import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./Home.css";
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
  const [resp, setResp] = useState([]);
  const [dataSend, setDataSend] = useState({name: "", message: ""})

  const handleClick = async event => {
    event.preventDefault();

    if(!!dataSend.name && !!dataSend.message){
      try {
        const resp = await axios.post("http://localhost:3001/message", dataSend);
        // console.log(resp);
      } catch (error) {}
    }

    
  };

  useEffect(() => {
    testFetch();
  }, []);

  const onChange = event => {
    const { name, messange } = event.target;
    setDataSend({...dataSend, [name]: messange})
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      withCredentials: true,
    });
    socket.on("message_12", (data) => {
      console.log("mensaje", data);
      setResp([...data]);
    });
  }, []);

  return (
    <div className="mainContainer">
      <div className="header">Monitor Chat</div>
      <div className="body">
      <form onSubmit={handleClick} className="formStyles">
        <label>
          Nombre
          <input name="name" type="text" value={dataSend.name} onChange={onChange} required />
        </label>
        <label>
          Mensaje
          <input name="message" type="text" value={dataSend.message} onChange={onChange} required/>
        </label>
        <button type="submit" value="Submit" >Send Message</button>
      </form>
      <div className="messange">
        {resp.length > 0 ? (
          resp.map((item) => (
            <div>
              {item.name} <label>{item.messange}</label>
            </div>
          ))
        ) : (
          <div>No hay mensajes aún</div>
        )}
      </div>
      </div>
      
    </div>
  );
}
