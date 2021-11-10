import './App.css';
import React, { useState } from "react"
// import { ImageLoader } from "react-spinner-image";
import { ImageLoader } from './lib/index';
function App() {
  const url = "template.png";
  const [state, setState] = useState({ LoadingPercent: 0 })
  // const url = "https://media.istockphoto.com/photos/mount-hood-oregon-picture-id1268487061?s=612x612"
  return (
    <div className="App">
      {state.LoadingPercent < 100 &&
        <h1>{`Loading ${state.LoadingPercent}%`} </h1>}
      <ImageLoader style={{ width: "100%" }} src={url} hideLoading onProgressUpdate={(progress) => {
        setState({ ...state, LoadingPercent: progress })
      }} />
    </div>
  );
}

export default App;
