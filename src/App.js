import React, { useState, useEffect } from 'react'
import './styles.css'
import Form from './Components/HomePage/index'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import RegistroC from './Components/Casos/RegistroC'
import Casos from './Components/Casos/Main'
import Mapa from './Components/Map/Map'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from './firebase'
  
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-database";
import "firebase/storage";
import "firebase/messaging";

function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)


	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		});
  })
  

	return firebaseInitialized !== false ? (
		<div>
			<CssBaseline />
			<Router>
				<Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/registro" component={Register} />
		<Route exact path="/home" component={Home} />
		<Route exact path="/casos" component={Casos} />
		<Route exact path="/registro-casos" component={RegistroC} />
		<Route exact path="/mapa-casos" component={Mapa} />
				</Switch>
			</Router>
      </div>
	) : <div id="loader"><CircularProgress /></div>
}

export default App;