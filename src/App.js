import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import KulfyKeyboard from './KulfyKeyboard/index';

function App() {
  const [opengif1, setOpengif1] = useState(true);
  const openSDK=()=>
  {
   setOpengif1(true)
  }
  const setParrentModel=(data)=>
  {setOpengif1(data)
  }
  const setParrentGifModel=(data)=>
  {
    console.log(data);
  }
  return (
    <div className="App">
      <button onClick={e => {openSDK()}} >open</button>
      {opengif1 && <KulfyKeyboard opengif={opengif1} setParrentModel={setParrentModel} setParrentGifModel={setParrentGifModel}></KulfyKeyboard>}
      
    </div>
  );
}

export default App;
