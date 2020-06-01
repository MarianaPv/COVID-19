import React, {useState} from "react";
import { Link } from "react-router-dom";
import "firebase/auth";
import app from "firebase/app";
import Navigation from "../NavBar/Navigation";
import RegisterBox from "../Casos/RegistroC"
import LoginBox from "../Casos/GestionC"
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Routes/Routes";
import "./Main.css";
import "firebase/database";
import OPTIONS from './RegistroC'
import ReactDOM from 'react-dom';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


function Casos(props){
 
    

    return(
        <div>
        <Navigation/>
        
        <div className="mensaje" > ¿Qué deseas hacer?</div>
   
      <div className="box-container">
     
       <button className="botonM">
       <div
         className={"controller " + (setIsRegistroOpen
         ? "selected-controller"
         : "")}
         onClick={RegisterBox}>
         REGISTRAR CASO
         
       </div>
       </button>
       <button className="botonM">
      <div
         className={"controller " + (setIsGestionOpen
         ? "selected-controller"
         : "")}
         onClick={LoginBox}>
        
         GESTIONAR CASO
         
       </div></button>  
       
     </div><div className="formulario">{isRegistroOpen==true ?  (<RegisterBox/>) : null}
      {isGestionOpen==true? <LoginBox/>:null}
      </div>
      </div>

    
    )

    
}

export default Casos
