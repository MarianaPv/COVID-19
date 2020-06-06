import React,{useEffect, useState} from 'react'
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
import _ from "lodash";



function Mapa (){

  const [allData, setAllData] = useState([])
  const [lat, setLat] =useState("");
  const [lng, setLng] = useState("")


  const getAllData = () => {
    return app
    .database()
    .ref("/casos")
    .on("value", snapshot => {
      const firebaseData = _.toArray(snapshot.val());
      setAllData(firebaseData); 
     
  })}

  useEffect(() => {
    getAllData();    
  
  }, []);

  useEffect(() => {
  
  }, [allData]);


  
    useEffect(()=>{
    Geocode.setApiKey("AIzaSyBXFpz69eQZ_N1SHO37O1e7mMmAlkWIikc")

    Geocode.fromAddress("Carrera 42f #90-85").then(
     
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setLat(lat)
          setLng(lng)

        },
        error => {
          console.error(error);
        }
      );
    },[]);

    
    return (
      
      <div >
        <Navigation/>
        <div style={{ marginLeft:"15vw", marginTop:"5vh",marginBottom:"5vh",height: '80vh', width: '70%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAps7iV33s_Nk0RwrOpQDzKw8CrJmgKJkk"}}
          defaultCenter={{lat:10.9878, lng:-74.7889} }
          defaultZoom={11}
          
        >

        </GoogleMapReact>
        </div>
    </div>

    )
  } 

  const Marker = props => {
    return <div className="SuperAwesomePin"></div>
  }

export default Mapa;