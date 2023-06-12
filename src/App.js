import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Loading from "./Loading";
const server = process.env.REACT_APP_SERVER;

function App() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  // const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState("atacadao");

  const saveFile = (e) => {
    setLoading(true);

    setFile(null);
    setFileName(null);

    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setLoading(false);

  };

  console.log(server);
  const uploadFile = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    // if (path.at(-1) != "\\") {
    //   setPath(path.concat("\\"));
    // }
    // if (path.slice(-1) !== "\\") {
    //   setPath((p) => (p += "\\"));
    // }
    try {
      await axios
        .post(server + "upload?store=" + store, formData)
        .then((res) => {
          console.log(res);
          // setFile(null);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          alert("eror");
        });
    } catch (ex) {
      console.log(ex);
      setFile(null);

      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <Loading />}
      <div>
        {/* <label>Choose directory</label>
        <input
          id="path"
          type="text"
          placeholder="path"
          onChange={(e) => setPath(e.target.value)}
        /> */}
        <div className="stores">
          <button
            style={{
              backgroundColor: `${store === "atacadao" ? "#b2ff97" : ""}`,
            }}
            onClick={() => setStore("atacadao")}
          >
            atacadao
          </button>
          <button
            style={{
              backgroundColor: `${store === "labelvie" ? "#b2ff97" : ""}`,
            }}
            onClick={() => setStore("labelvie")}
          >
            labelvie
          </button>
          <button
            style={{
              backgroundColor: `${store === "franchise" ? "#b2ff97" : ""}`,
            }}
            onClick={() => setStore("franchise")}
          >
            franchise
          </button>
        </div>
        <label id="upload" htmlFor="file">
          <span>Upload</span> <AiOutlineCloudUpload />
        </label>

        <label>{fileName}</label>
        <input id="file" type="file" onChange={saveFile} />
        {file && (
          <button id="save" onClick={uploadFile}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
