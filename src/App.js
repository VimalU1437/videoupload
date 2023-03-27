import { useState } from "react";
import "./app.css";
import Upload from "./componens/upload";
import Video from "./componens/video";


function App() {
  const[inputFile,setInputFile] = useState("");
  const[location,setLocation] = useState("");

  function assignInputfile(file){
    setInputFile(file);
  }

  function assignLocation(path){
    setLocation(path);
  }
  return (
    <div className='main-div'>
      {
        location === "" ?
        <Upload inputFile={inputFile} assignLocation={assignLocation} assignInputfile={assignInputfile}/>:
        <Video location={location} />

      }
    </div>
  );
}

export default App;
