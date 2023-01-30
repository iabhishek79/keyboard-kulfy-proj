import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import "./index.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

function KulfyKeyboard() {

    const [modalShow, setModalShow] = React.useState(false);
    
  return (
    <div className="nonsense">
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
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}/>
    </div>
    
  );
}


export default KulfyKeyboard;
