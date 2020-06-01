import React, { useState } from "react";
import { Link } from "react-router-dom";
import "firebase/auth";
import app from "firebase/app";
import Navigation from "../NavBar/Navigation";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Routes/Routes";
import "./RegistroC.css";
import "firebase/database";
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

function RegisterBox(props) {
  const [nombreC, setNombreC] = useState("");
  const [apellidoC, setApellidoC] = useState("");
  const [cedulaC, setCedulaC] = useState("");
  const [sexoC, setSexoC] = useState("");
  const [nacC, setNacC] = useState(new Date());
  const [resiC, setResiC] = useState("");
  const [trabajoC, setTrabajoC] = useState("");
  const [examenC, setExamenC] = useState("");
  const [idC, setIdC] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [fechaExamenC, setFechaExamenC] = useState(new Date());
  

  const handleSubmit2 = () => {
    setIdC(idC + 1);

    let resumen = {
      nombre: nombreC,
      apellido: apellidoC,
      cedula: cedulaC,
      sexo: sexoC,
      fechaNacimiento: nacC,
      direccionResidencia: resiC,
      direccionTrabajo: trabajoC,
      resultadoExamen: examenC,
      fechaExamen: fechaExamenC,
      idCaso: idC,
    };

    let messageRef = firebase.database().ref("casos");
    firebase
      .database()
      .ref("casos/" + idC)
      .update(resumen);
    alert("¡Se ha registrado el caso!")

    
  };



  const dateOutput = (date) => {
    setNacC(new Date(date));
  };

  const dateOutput2 = (date) => {
    setFechaExamenC(new Date(date));
  };
  const handleDatePicker = (date) => {
    setStartDate(date);
    dateOutput(date)
  };
  const handleDatePicker2 = (date) => {
    setStartDate(date);
    dateOutput2(date)
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "4vh" }}>
      <div>Nombre</div>
      <input style ={{marginBottom:"1.5vh"}}onChange={(e) => setNombreC(e.target.value)}></input>
      <div>Apellido</div>
      <input style ={{marginBottom:"1.5vh"}} onChange={(e) => setApellidoC(e.target.value)}></input>
      <div>Cédula</div>
      <input style ={{marginBottom:"1.5vh"}} onChange={(e) => setCedulaC(e.target.value)}></input>
      <div>Sexo</div>
      <input style ={{marginBottom:"1.5vh"}} onChange={(e) => setSexoC(e.target.value)}></input>

      <div>Fecha de Nacimiento</div>
      <DatePicker
          selected={startDate}
          onChange={handleDatePicker}
          value={nacC}
          dateFormat="MMMM d, yyyy "
        />
     
      <div style ={{marginTop:"1.5vh"}}>Dirección de Residencia</div>
      <input style ={{marginBottom:"1.5vh"}} onChange={(e) => setResiC(e.target.value)}></input>
      <div>Dirección de trabajo</div>
      <input style ={{marginBottom:"1.5vh"}} onChange={(e) => setTrabajoC(e.target.value)}></input>
      <div>Resultado de examen (Positivo/Negativo)</div>
      <input style ={{marginBottom:"1.5vh"}} onChange={(e) => setExamenC(e.target.value)}></input>
      <div>Fecha de examen</div>      
      <DatePicker
          selected={startDate}
          onChange={handleDatePicker2}
          value={fechaExamenC}
          dateFormat="MMMM d, yyyy "
        />

      <button
        style={{
          height: "4vh",
          border: "0",
          borderRadius: "5px",
          marginTop: "3vh",
          marginBottom: "5vh",
          marginLeft: "21vw",
          background: "#36ad9e",
          color: "white",
          width: "9vw",
          fontFamily: "'Jost', sans-serif",
          fontSize: "15px",
          cursor: "pointer",
        }}
        onClick={handleSubmit2}
      >
        Registrar Caso
      </button>
    </div>
  );
}

export default withRouter(RegisterBox);