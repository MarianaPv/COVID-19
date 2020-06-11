import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./index.css";
import * as ROUTES from "../Routes/Routes";
import React, { useState } from "react";
import { Input, InputLabel } from "@material-ui/core";
import app from "firebase/app";
import "firebase/auth";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  app.auth().onAuthStateChanged((user) => {
    if (user) {
      props.history.push("/home");
    }
  });

  return (
    <div className="telematica" style={{ width: "100vw", height: "100vh" }}>
      <div className="col">
        <div className="bodyp"></div>
      </div>

      <div className="primero">
        <div className="claseUno">
          <div
            style={{ color: "black", fontSize: "28px", alignSelf: "center" }}
          >
            BIENVENIDO
          </div>
        </div>

        <div className="form" onSubmit={(e) => e.preventDefault() && false}>
          <div
            className="ingresar"
            style={{ color: "black", fontSize: "28px", marginLeft: "5vw" }}
          >
            Ingresar:
          </div>
          <div margin="normal">
            <InputLabel htmlFor="email" style={{ marginLeft: "5vw" }}>
              Correo Electrónico
            </InputLabel>
            <Input
              id="email"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div margin="normal" required fullWidth>
            <InputLabel htmlFor="password" style={{ marginLeft: "5vw" }}>
              Contraseña
            </InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            color="white"
            onClick={login}
            className="submit"
          >
            INGRESAR
          </button>
          <Link to={ROUTES.REGISTRO}>
            <button type="submit" fullWidth className="submit2">
              REGISTRARSE{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  async function login() {
    try {
      await firebase.login(email, password);
      props.history.replace("/home");
    } catch (error) {
      alert(error.message);
    }
  }
}

export default withRouter(SignIn);
