import React, {useState} from "react";
import { Link } from "react-router-dom";
import "firebase/auth";
import app from "firebase/app";
import Navigation from "../NavBar/Navigation";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Routes/Routes";
import "./RegistroC.css";
import "firebase/database";


var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function RegisterBox (){

    const [isRegistroOpen, setIsRegistroOpen] = useState(true)
    const [isGestionOpen, setIsGestionOpen] = useState(false)
    const [nombreC, setNombreC] = useState('');
    const [apellidoC, setApellidoC] = useState('');
    const [cedulaC, setCedulaC] = useState('');
    const [sexoC, setSexoC] = useState('');
    const [nacC, setNacC] = useState('');
    const [resiC, setResiC] = useState('');
    const [trabajoC, setTrabajoC] = useState('');
    const [examenC, setExamenC] = useState('');
    const [fechaExamenC, setFechaExamenC] = useState('');
    const [idC, setIdC] = useState(1);
    setIsGestionOpen(false)
    setIsRegistroOpen(true)



    const handleSubmit2 = () =>{
        
        setIdC(idC+1)

        
        let resumen= {
            "nombre": nombreC,
            "apellido": apellidoC,
            "cedula": cedulaC,
            "sexo": sexoC,
            "fechaNacimiento": nacC,
            "direccionResidencia": resiC,
            "direccionTrabajo": trabajoC,
            "resultadoExamen": examenC,
            "fechaExamen": fechaExamenC,
            "idCaso":idC

        }
        
        let messageRef = firebase.database().ref('casos')
        firebase.database().ref('casos/'+idC).update(resumen);
        alert("¡Se ha añadido su producto!");
    }
        return(
            <div>
                <div>Nombre</div>
                <input onChange = {e => setNombreC(e.target.value)}></input>
                <div>Apellido</div>
                <input onChange = {e => setApellidoC(e.target.value)}></input>
                <div>Cédula</div>
                <input onChange = {e => setCedulaC(e.target.value)}></input>
                <div>Sexo</div>
                <input onChange = {e => setSexoC(e.target.value)}></input>
                <div>Fecha de Nacimiento</div>
                <input onChange = {e => setNacC(e.target.value)}></input>
                <div>Dirección de Residencia</div>
                <input onChange = {e => setResiC(e.target.value)}></input>
                <div>Dirección de trabajo</div>
                <input onChange = {e => setTrabajoC(e.target.value)}></input>
                <div>Resultado de examen (Positivo/Negativo)</div>
                <input onChange = {e => setExamenC(e.target.value)}></input>
                <div>Fecha de examen</div>
                <input onChange = {e => setFechaExamenC(e.target.value)}></input>
                <button className="botoncito2" onClick = {handleSubmit2}>Agregar producto</button>
            </div>
        )
    }

export default withRouter(RegisterBox)