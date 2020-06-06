import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "firebase/auth";
import app from "firebase/app";
import Navigation from "../NavBar/Navigation";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Routes/Routes";
import "firebase/database";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

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
  const [tipoV, setTipoV] = useState("");
  const [via1, setVia1] = useState("");
  const [via2, setVia2] = useState("");
  const [num, setNum] = useState("");
  const [tipoV2, setTipoV2] = useState("");
  const [via12, setVia12] = useState("");
  const [via22, setVia22] = useState("");
  const [num2, setNum2] = useState("");

  const getAllUsers = () => {
    return app
      .database()
      .ref("/contador")
      .on("value", (snapshot) => {
        setIdC(snapshot.val().contador);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    console.log(idC);
  }, [idC]);

  const handleSubmit2 = () => {
    Number.prototype.padLeft = function (base, chr) {
      var len = String(base || 10).length - String(this).length + 1;
      return len > 0 ? new Array(len).join(chr || "0") + this : this;
    };

    let nacC1 = [
      (nacC.getMonth() + 1).padLeft(),
      nacC.getDate().padLeft(),
      nacC.getFullYear(),
    ].join("/");

    let fechaExamenC2 = [
      (fechaExamenC.getMonth() + 1).padLeft(),
      fechaExamenC.getDate().padLeft(),
      fechaExamenC.getFullYear(),
    ].join("/");

    let contador = {
      contador: parseInt(idC) + parseInt(1),
    };

    let resumen = {
      nombre: nombreC,
      apellido: apellidoC,
      cedula: cedulaC,
      sexo: sexoC,
      fechaNacimiento: nacC1,
      direccionResidencia: tipoV + " " + via1 + " " + "#" + via2 + "-" + num,
      direccionTrabajo: tipoV2 + " " + via12 + " " + "#" + via22 + "-" + num2,
      resultadoExamen: examenC,
      fechaExamen: fechaExamenC2,
      id: idC,
    };

    let messageRef = firebase.database().ref("casos");
    firebase
      .database()
      .ref("casos/" + idC)
      .update(resumen);
    alert("¡Se ha registrado el caso!");

    firebase.database().ref("contador/").update(contador);
  };

  const dateOutput = (date) => {
    setNacC(new Date(date));
  };

  const dateOutput2 = (date) => {
    setFechaExamenC(new Date(date));
  };
  const handleDatePicker = (date) => {
    setStartDate(date);
    dateOutput(date);
  };
  const handleDatePicker2 = (date) => {
    setStartDate(date);
    dateOutput2(date);
  };

  return (
    <div className="formulario">
      <div className="division">
        <div style={{ marginRight: "0.5vw" }}>Nombre:</div>
        <input onChange={(e) => setNombreC(e.target.value)}></input>
        <div style={{ marginLeft: "3.2vw", marginRight: "0.5vw" }}>
          Apellido:
        </div>
        <input onChange={(e) => setApellidoC(e.target.value)}></input>
      </div>
      <div className="division">
        <div style={{ marginRight: "0.5vw" }}>Cédula:</div>
        <input onChange={(e) => setCedulaC(e.target.value)}></input>
        <div style={{ marginLeft: "3.6vw", marginRight: "0.5vw" }}>Sexo:</div>
        <select
          onChange={(e) => setSexoC(e.target.value)}
          className="menu2"
          style={{
            width: "9vw",
            display: "flex",
            flexDirection: "column",
            marginRight: "2vw",
          }}
        >
          <option style={{ color: "grey" }}>Seleccione</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
        </select>
      </div>
      <div className="division">
        <div style={{ marginRight: "0.5vw" }}>Fecha de Nacimiento:</div>
        <DatePicker
          selected={startDate}
          onChange={handleDatePicker}
          value={nacC}
          dateFormat="MMMM d, yyyy "
        />
      </div>
      <div className="division" style={{ marginBottom: "1vh" }}>
        Dirección de Residencia:{" "}
      </div>
      <div className="direccion">
        <select
          onChange={(e) => setTipoV(e.target.value)}
          className="menu2"
          style={{
            width: "9vw",
            display: "flex",
            flexDirection: "column",
            marginRight: "2vw",
          }}
        >
          <option style={{ color: "grey" }}>Via principal</option>
          <option value="Autopista">Autopista</option>
          <option value="Avenida">Avenida</option>
          <option value="Calle">Calle</option>
          <option value="Carrera">Carrera</option>
          <option value="Circular">Circular</option>
          <option value="Diagonal">Diagonal</option>
          <option value="Manzana">Manzana</option>
          <option value="Transversal">Transversal</option>
          <option value="Via">Via</option>
        </select>

        <input
          style={{ flexDirection: "column", width: "5vw" }}
          onChange={(e) => setVia1(e.target.value)}
        ></input>
        <div style={{ marginLeft: "1.3vw", marginRight: "1.3vw" }}> # </div>
        <input
          style={{ flexDirection: "column", width: "5vw", marginRight: "2w" }}
          onChange={(e) => setVia2(e.target.value)}
        ></input>
        <div style={{ marginLeft: "1.3vw", marginRight: "1.3vw" }}>-</div>
        <input
          style={{ flexDirection: "column", width: "5vw" }}
          onChange={(e) => setNum(e.target.value)}
        ></input>
      </div>

      <div className="division" style={{ marginBottom: "1vh" }}>
        Dirección de Trabajo:
      </div>
      <div className="direccion">
        <select
          onChange={(e) => setTipoV2(e.target.value)}
          className="menu2"
          style={{
            width: "9vw",
            display: "flex",
            flexDirection: "column",
            marginRight: "2vw",
          }}
        >
          <option style={{ color: "grey" }}>Via principal</option>
          <option value="Autopista">Autopista</option>
          <option value="Avenida">Avenida</option>
          <option value="Calle">Calle</option>
          <option value="Carrera">Carrera</option>
          <option value="Circular">Circular</option>
          <option value="Diagonal">Diagonal</option>
          <option value="Manzana">Manzana</option>
          <option value="Transversal">Transversal</option>
          <option value="Via">Via</option>
        </select>

        <input
          style={{ flexDirection: "column", width: "5vw" }}
          onChange={(e) => setVia12(e.target.value)}
        ></input>
        <div style={{ marginLeft: "1.3vw", marginRight: "1.3vw" }}> # </div>
        <input
          style={{ flexDirection: "column", width: "5vw", marginRight: "2w" }}
          onChange={(e) => setVia22(e.target.value)}
        ></input>
        <div style={{ marginLeft: "1.3vw", marginRight: "1.3vw" }}>-</div>
        <input
          style={{ flexDirection: "column", width: "5vw" }}
          onChange={(e) => setNum2(e.target.value)}
        ></input>
      </div>

      <div className="division">
        <div style={{ marginRight: "1vw" }}>Resultado de examen:</div>
        <select
          onChange={(e) => setExamenC(e.target.value)}
          className="menu2"
          style={{
            width: "9vw",
            display: "flex",
            flexDirection: "column",
            marginRight: "2vw",
          }}
        >
          <option style={{ color: "grey" }}>Seleccione</option>
          <option value="Positivo">Positivo</option>
          <option value="Negativo">Negativo</option>
        </select>
      </div>
      <div className="division">
        <div style={{ marginRight: "0.5vw" }}>Fecha de examen:</div>
        <DatePicker
          selected={startDate}
          onChange={handleDatePicker2}
          value={fechaExamenC}
          dateFormat="MMMM d, yyyy "
        />
      </div>

      <button
        style={{
          height: "4vh",
          border: "0",
          borderRadius: "5px",
          marginTop: "4vh",
          marginBottom: "5vh",
          marginLeft: "23vw",
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
