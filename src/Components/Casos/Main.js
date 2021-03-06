import React, { useState, useEffect } from "react";
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
  const [currentU, setCurrentU] = useState("ayudante");
  app.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push("/");
    }
  });

  const verifyUser = () => {
    let email = app.auth().currentUser.email.split(".")[0];
    app
      .database()
      .ref("/usuarios/" + email)
      .on("value", (snapshot) => {
        const allFBData = snapshot.val().rol;
        setCurrentU(allFBData);
      });
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (currentU !== "ayudante" && currentU !== "administrador") {
      props.history.push("/home");
    }
  }, [currentU]);
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
