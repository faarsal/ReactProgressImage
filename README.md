# React Progress Image

react-progress-image is an `<img>` tag replacement for react supporting displaying a loading spinner or bar in case the large image takes a lot of time to load. This library supports displaying custom loading bar or spinners.

## Getting Started

To install this library use the npm install command:

    npm install react-progress-image --save

Later import the ImageLoader component from it

    import {ImageLoader} from "react-progress-image";

## Dependencies

`react-progress-image ` has no external dependencies, aside for a version of react and react-dom which support hooks and @babel/runtime.

## Documentation

ImageLoader

|      Props       |                                                          Documentation                                                          |
| :--------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
| onProgressUpdate |         Callback for the event when image loading progress is change. This provides the percentage of image downloaded          |
|      onDone      |                                     Callback for the event when image download is completed                                     |
|   hideLoading    | Boolean: to hide the default loading display of the component. This should to be true when custom loader is used. Default:false |

Example Usage:

This is the example of using custom loader.
Replace the `<h1>` with your custom loader component

    import React,{useState} from "react"
    import {ImageLoader} from "react-progress-image";

    const  ImageComponent=()=> {
      const url="test-url";
      const [state,setState]=useState({LoadingPercent:0})
      return (
        <div>
        {state.LoadingPercent<100 &&
        <h1>{`Loading ${state.LoadingPercent}%`} </h1>}
         <ImageLoader src={url} hideLoading onProgressUpdate={(progress)=>{
           setState({...state,LoadingPercent:progress})
         }}/>
        </div>
      );
    }

    export default ImageComponent;
