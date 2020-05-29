import firebase from 'firebase';
import app from 'firebase/app'
import 'firebase/auth'
import react from 'react'
import 'firebase/firestore'
import "firebase/firebase-database";
import 'firebase/storage';

  const config = {
    apiKey: "AIzaSyAps7iV33s_Nk0RwrOpQDzKw8CrJmgKJkk",
    authDomain: "covid-277603.firebaseapp.com",
    databaseURL: "https://covid-277603.firebaseio.com",
    projectId: "covid-277603",
    storageBucket: "covid-277603.appspot.com",
    messagingSenderId: "680475618519",
    appId: "1:680475618519:web:f7e68396ad7c9f6b9b9492"
  };
  

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.database()
		this.storage = app.storage();

	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		let resumen2= {
			"usuario":name,
			"correoElectronico" :email,
			"contraseña" :password
		}

		let messageRef = firebase.database().ref('usuarios')
		firebase.database().ref('usuarios/'+name).update(resumen2);
		return this.auth.currentUser.updateProfile({displayName: name})
		
	}
	

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}


}

export default new Firebase();