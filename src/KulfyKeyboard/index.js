import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import "./index.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

function KulfyKeyboard(prop) {
  var op= false;
  var gifdata="";
  const setModel=()=>{
    setModalShow(false);
    prop.setParrentModel(false);
    prop.setParrentGifModel(gifdata);
  }
  if(prop.opengif)
  {
    op=true;
  }
  else  
  {
    op=false;
  }
  
  const [modalShow, setModalShow] = React.useState(op);
  
  const setGifModel=(data)=>
  {
    gifdata=data;
    setModel();
  }
  return (
    
    <div className={"nonsense "+ (prop.opengif? "hide_div" : "display_div") } >
      { !modalShow &&
        <div className="div-p-img">
             <div className="imgdiv" />
        <Form.Control
        className="input-el"
        type="text"
        onClick={() => setModalShow(true)}
        placeholder="Disabled readonly input"
        aria-label="Disabled input example"
        readOnly
      />
    </div>
    }  
    
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={(e) => setModel()}
        setGifModel={setGifModel}
        />
    </div>
    
  );
}


export default KulfyKeyboard;
