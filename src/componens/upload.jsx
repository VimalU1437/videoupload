import { useRef, useState } from 'react';
import { Button, Container, Form, ProgressBar } from 'react-bootstrap';
import { config } from '../config';
import { Buffer } from "buffer";
import S3 from 'react-aws-s3';







Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;


const ReactS3Client = new S3(config);



export default function Upload ({inputFile,assignInputfile,assignLocation}){
    const fileRef = useRef(null);
    const[dragColor,setDragColor] = useState({background:"white"});
    const [loading,setLoading] = useState(false);
    // console.log(S3FileUpload);

    

    function handleFileClick(e){
        // e.preventDefault();
        fileRef.current.click();
    }

    function upload(file){
        // S3FileUpload.uploadFile(file,config)
        // .then(data=>{
        //     console.log(data);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        // console.log(file);
        setLoading(true);
        ReactS3Client.uploadFile(file,file.name).then(data=>{
            console.log(data);
            assignLocation(data.location);
        }).catch(err=>console.log(err)); 

    }

    function inputFileHandle(e){
        // console.log(e.target.files[0]);
        assignInputfile(e.target.files[0]);
        upload(e.target.files[0])
    }

    function handleDrop(e){
        e.preventDefault();
        // console.log(e);
        assignInputfile(e.dataTransfer.files[0]);
        upload(e.dataTransfer.files[0]);
        setDragColor({background:"white"});
    

    }

    return <>
          <Container className="main-container p-4"  >
            <h1>You can upload video</h1>
        <Form
        onDragOver={(e)=>{
            e.preventDefault();
            setDragColor({background:"#c9dfff"});
        }}
        onDragLeave={()=>{
            setDragColor({background:"white"});
        }}
        onDrop={handleDrop}
        className="p-4"
        style={dragColor}>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Click on the button or drag&drop file here</Form.Label>
        <Form.Control onChange={inputFileHandle}  type="file" accept='video/mp4' ref={fileRef} style={{display:"none"}}  />
      </Form.Group>
      <Form.Group>
        <Button 
        onClick={handleFileClick}
        variant='primary'>Upload Video</Button>
      </Form.Group>
        </Form>
        <Container>
            <label>{inputFile.name}</label>
            {loading &&<> <img  src='./loading.gif' style={{width:"400px",height:"100px"}} alt="loading" /> <span>uploading...</span> </>}
        <ProgressBar now={56} />
        </Container>

      </Container>
    </>
}