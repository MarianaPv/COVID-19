import React,{useEffect} from 'react'
import {GoogleComponent} from 'react-google-location'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import * as ROUTES from "../Routes/Routes";
import "./Map.css";
import app from "firebase/app";
import "firebase/auth";
import Navigation from "../NavBar/Navigation";
import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Mapa() {

    useEffect(()=>{
    Geocode.setApiKey("AIzaSyBXFpz69eQZ_N1SHO37O1e7mMmAlkWIikc")

    Geocode.fromAddress("Cra. 42F #90-85").then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        error => {
          console.error(error);
        }
      );
    });

      
    return (
      <div >
        <Navigation/>
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAps7iV33s_Nk0RwrOpQDzKw8CrJmgKJkk"}}
          defaultCenter={{lat:10.9878, lng:-74.7889} }
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={0}
            lng={0}
            text="My Marker"
          />
        </GoogleMapReact>
        </div>
    </div>

    )
  } 



export default Mapa;