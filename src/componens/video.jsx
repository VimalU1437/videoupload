
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css"; 



export default function Video({location}){
    // console.log(location);
    return<div style={{width:"90%",margin:"0 auto"}}>
        <Player
        autoPlay
      playsInline
      src={location}
    />
    
    </div>
}