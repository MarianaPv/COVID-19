import React, { useEffect, useState } from "react";
import { GoogleComponent } from "react-google-location";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import * as ROUTES from "../Routes/Routes";
import "./Map.css";
import app from "firebase/app";
import "firebase/auth";
import Navigation from "../NavBar/Navigation";
import Geocode from "react-geocode";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import casoUCI from "./orange.png";
import casoCurado from "./pink.png";
import casoRed from "./red.png";
import casoTratamiento from "./yellow.png";
import casoNegativo from "./green.png";
import _ from "lodash";

function Mapa(props) {
  const [allData, setAllData] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [currentU, setCurrentU] = useState("medico");
  app.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push("/");
    }
  });

  const getAllData = () => {
    return app
      .database()
      .ref("/casos")
      .on("value", (snapshot) => {
        const firebaseData = _.toArray(snapshot.val());
        setAllData(firebaseData);
      });
  };

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
    getAllData();
    verifyUser();
  }, []);

  useEffect(() => {
    if (currentU !== "medico" && currentU !== "administrador") {
      props.history.push("/home");
    }
  }, [currentU]);

  let allMarkers =
    allData.length > 0 &&
    allData.map((ele, index) => {
      if (index !== 0) {
        if (ele.resultadoExamen === "Fallecido") {
          return (
            <Marker
              position={[ele.latHome, ele.longHome]}
              icon={L.icon({
                iconUrl: casoRed,
                iconSize: [40, 40],
              })}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
            >
              {" "}
              <Popup>
                Dirección de residencia de {ele.nombre + " " + ele.apellido} con
                cédula {ele.cedula}
              </Popup>
            </Marker>
          );
        } else if (
          ele.resultadoExamen === "Positivo en casa" ||
          ele.resultadoExamen === "Positivo"
        ) {
          return (
            <Marker
              position={[ele.latHome, ele.longHome]}
              icon={L.icon({
                iconUrl: casoTratamiento,
                iconSize: [40, 40],
              })}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
            >
              {" "}
              <Popup>
                Dirección de residencia de {ele.nombre + " " + ele.apellido} con
                cédula {ele.cedula}
              </Popup>
            </Marker>
          );
        } else if (ele.resultadoExamen === "Curado") {
          return (
            <Marker
              position={[ele.latHome, ele.longHome]}
              icon={L.icon({
                iconUrl: casoCurado,
                iconSize: [40, 40],
              })}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
            >
              {" "}
              <Popup>
                Dirección de residencia de {ele.nombre + " " + ele.apellido} con
                cédula {ele.cedula}
              </Popup>
            </Marker>
          );
        } else if (ele.resultadoExamen == "Positivo en UCI") {
          return (
            <Marker
              position={[ele.latHome, ele.longHome]}
              icon={L.icon({
                iconUrl: casoUCI,
                iconSize: [40, 40],
              })}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
            >
              {" "}
              <Popup>
                Dirección de residencia de {ele.nombre + " " + ele.apellido} con
                cédula {ele.cedula}
              </Popup>
            </Marker>
          );
        } else if (ele.resultadoExamen === "Negativo") {
          return (
            <Marker
              position={[ele.latHome, ele.longHome]}
              icon={L.icon({
                iconUrl: casoNegativo,
                iconSize: [40, 40],
              })}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
            >
              {" "}
              <Popup>
                Dirección de residencia de {ele.nombre + " " + ele.apellido} con
                cédula {ele.cedula}
              </Popup>
            </Marker>
          );
        }
      }
    });

  return (
    <div>
      <Navigation />
      <div
        style={{
          marginLeft: "15vw",
          marginTop: "5vh",
          marginBottom: "5vh",
          height: "80vh",
          width: "70%",
        }}
      >
        <Map className="map" center={[10.9878, -74.7889]} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allMarkers}
        </Map>
      </div>
    </div>
  );
}

export default Mapa;
