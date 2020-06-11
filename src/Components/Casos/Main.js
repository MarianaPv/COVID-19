import React, { useState } from "react";
import "firebase/auth";
import app from "firebase/app";
import Navigation from "../NavBar/Navigation";
import RegisterBox from "../Casos/RegistroC";
import LoginBox from "../Casos/GestionC";
import "./Main.css";
import "firebase/database";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

function Casos(props) {
  const [isRegistroOpen, setIsRegistroOpen] = useState(true);
  app.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push("/");
    }
  });

  return (
    <div>
      <Navigation />

      <div className="mensaje"> ¿Qué deseas hacer?</div>

      <div className="box-container">
        <button className="botonM">
          <div
            className={
              "controller " + (isRegistroOpen ? "selected-controller" : "")
            }
            style={{
              color: isRegistroOpen && "#36ad9e",
              fontWeight: isRegistroOpen && "bold",
            }}
            onClick={() => setIsRegistroOpen(true)}
          >
            REGISTRAR CASO
          </div>
        </button>
        <button className="botonM">
          <div
            className={
              "controller " + (!isRegistroOpen ? "selected-controller" : "")
            }
            style={{
              color: !isRegistroOpen && "#36ad9e",
              fontWeight: !isRegistroOpen && "bold",
            }}
            onClick={() => setIsRegistroOpen(false)}
          >
            GESTIONAR CASO
          </div>
        </button>
      </div>
      <div className="formulario">
        {isRegistroOpen == true ? <RegisterBox /> : <LoginBox />}
      </div>
    </div>
  );
}

export default Casos;
