import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../Routes/Routes";
import { withRouter } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  const logout = () => {
    props.history.replace("/"); //Irse a página de login al hacer logout
  };


  return (
    <div className="bodyy">
      <section>
        <header >
          <div className="navBox">
            <ul className="extra" >
              <li>
                <Link to={ROUTES.HOME}>HOME</Link>
                
              </li>
              <li>
                <Link to={ROUTES.CASOS}>CASOS</Link>
                
              </li>
              <li>
                <Link to={ROUTES.HOME}>MAPA DE CASOS</Link>
                
              </li>
              <li>
                <Link to={ROUTES.HOME}>BÚSQUEDA DE CASOS</Link>
                
              </li>

            </ul>
          </div>
          <input className="logout" type="image" src="logocovid.png" />
        </header>
      </section>
    </div>
  );
}
export default withRouter(Navigation);