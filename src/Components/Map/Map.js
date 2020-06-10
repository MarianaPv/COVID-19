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

function Mapa() {
  const [allData, setAllData] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

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

  useEffect(() => {
    Geocode.setApiKey("AIzaSyBXFpz69eQZ_N1SHO37O1e7mMmAlkWIikc");

    Geocode.fromAddress("Carrera 42f #90-85").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLat(lat);
        setLng(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

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
          <Marker
            position={[11.01, -74.85]}
            icon={L.icon({
              iconUrl: casoCurado,
              iconSize: [40, 40],
            })}
          ></Marker>
        </Map>
      </div>
    </div>
  );
}

export default Mapa;
