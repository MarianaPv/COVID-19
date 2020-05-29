import React, {useState, useEffect} from 'react'
import app from "firebase/app";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import * as ROUTES from "../Routes/Routes";
import "firebase/database";
import './Home.css'

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


function Home(props){
    return(
        <div>
            <Navigation/>
            Hola mundo
        </div>
    )
    }

export default withRouter(Home)