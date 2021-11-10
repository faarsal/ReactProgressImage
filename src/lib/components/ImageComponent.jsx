import React, { useEffect, useState } from "react";


let ImageLoader = (props) => {
  const { src } = props;

  let [state, setState] = useState({
    downloadProgress: 0,
    responseImage: null,
    donwloadStarted:false
  });
  const DownloadImage = async () => {
    setState({...state,donwloadStarted:true})
    const myRequest = new Request(src);
    let imageUrl=""
    try{
    let response = await fetch(myRequest);

    const contentLength = response.headers.get("content-length");
    const total = parseInt(contentLength, 10);
    let loaded = 0;

    const res = new Response(
      new ReadableStream({
        async start(controller) {
          const reader = response.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            loaded += value.byteLength;
            const downloadProgress = parseFloat(
              ((loaded / total) * 100).toFixed(1)
            );
            setState({ ...state, downloadProgress });
            if (props.onProgressUpdate)
              props.onProgressUpdate(downloadProgress);
            controller.enqueue(value);
          }
          controller.close();
        },
      })
    );
    const blob = await res.blob();
    var urlCreator = window.URL || window.webkitURL;
     imageUrl = urlCreator.createObjectURL(blob);
    
    }
    catch(error){
        imageUrl=src
    }
    setState({ ...state, downloadProgress: 100, responseImage: imageUrl });
    if (props.onProgressUpdate)
    props.onProgressUpdate(100);
    if (props.onDone) props.onDone();
  };


  useEffect(() => {
   if(state.donwloadStarted===false)
    DownloadImage();
  },[]);

  if (state.downloadProgress === 100) return <img src={state.responseImage} alt={props.alt} />;
  if (props.hideLoading!==true)
    return (
      <div>{`Loading Image ${state.downloadProgress}%`}</div>
    );
  return (<div/>);
};
export default ImageLoader;
