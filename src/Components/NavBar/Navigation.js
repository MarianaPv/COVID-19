import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../Routes/Routes";
import { withRouter } from "react-router-dom";
import "./Navigation.css";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

function Navigation(props) {
  const logout = () => {
    firebase.auth().signOut();
    props.history.replace("/"); //Irse a página de login al hacer logout
  };

  return (
    <div className="bodyy">
      <section>
        <header>
          <div className="navBox">
            <ul className="extra">
              <li>
                <Link to={ROUTES.HOME}>HOME</Link>
              </li>
              <li>
                <Link to={ROUTES.CASOS}>CASOS</Link>
              </li>
              <li>
                <Link to={ROUTES.MAPA}>MAPA DE CASOS</Link>
              </li>
              <li>
                <Link to={ROUTES.BUSQUEDA}>BÚSQUEDA DE CASOS</Link>
              </li>
            </ul>
          </div>

          <div style={{ display: "flex" }}>
            <img className="logo" type="image" src="logocovid.png" />
            <input
              className="logout"
              src="bye.png"
              type="image"
              onClick={logout}
            />
          </div>
        </header>
      </section>
    </div>
  );
}
export default withRouter(Navigation);
