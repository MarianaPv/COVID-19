import React, { useEffect, useState } from "react";
import { GoogleComponent } from "react-google-location";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import * as ROUTES from "../Routes/Routes";
import app from "firebase/app";
import "firebase/auth";
import Geocode from "react-geocode";
import _ from "lodash";
import "./Busqueda.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import markerCasa from "./home.png";
import markerTrabajo from "./work.png";

function Mapa(props) {
  const [allData, setAllData] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const getAllData = () => {
    return app
      .database()
      .ref("/casos")
      .on("value", (snapshot) => {
        const firebaseData = _.toArray(snapshot.val());
        setAllData(firebaseData);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {}, [allData]);

  let allWorkMarkers =
    props.filteredArray.length > 0 &&
    props.filteredArray.map((ele) => {
      return (
        <Marker
          position={[ele.latWork, ele.longWork]}
          icon={L.icon({
            iconUrl: markerCasa,
            iconSize: [40, 40],
          })}
          onMouseOver={(e) => {
            e.target.openPopup();
          }}
          onMouseOut={(e) => {
            e.target.closePopup();
          }}
        >
          <Popup>
            Dirección de trabajo de {ele.nombre + " " + ele.apellido} con cédula{" "}
            {ele.cedula}
          </Popup>
        </Marker>
      );
    });

  let allHouseMarkers =
    props.filteredArray.length > 0 &&
    props.filteredArray.map((ele) => {
      return (
        <Marker
          position={[ele.latHome, ele.longHome]}
          icon={L.icon({
            iconUrl: markerTrabajo,
            iconSize: [37, 37],
          })}
          onMouseOver={(e) => {
            e.target.openPopup();
          }}
          onMouseOut={(e) => {
            e.target.closePopup();
          }}
        >
          <Popup>
            Dirección de residencia de {ele.nombre + " " + ele.apellido} con
            cédula {ele.cedula}
          </Popup>
        </Marker>
      );
    });

  return (
    <div>
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
          {allWorkMarkers}
          {allHouseMarkers}
        </Map>
      </div>
    </div>
  );
}

export default Mapa;
