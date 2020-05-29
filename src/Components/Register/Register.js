import React, { useState } from 'react'
import {Input, InputLabel } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import * as ROUTES from "../Routes/Routes";
import "./Register.css";
import app from "firebase/app";



function Register(props) {


	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<div className="telematica" style={{width:'100vw', height:'100vh'}}>
		<div className="col">
        <div className="bodyp"></div>
		</div>
		<div className="primero">
		<div className="claseUno2">
		
       			</div>
				<form className="form" onSubmit={e => e.preventDefault() && false }>
				<div className="registrarse" style={{color: "black", fontSize: "20px", marginLeft:"5vw"}}>Registrarse:</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="name" style={{marginLeft:"5vw"}}>Nombre de Usuario</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="email" style={{marginLeft:"5vw"}}>Correo Electrónico</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="password" style={{marginLeft:"5vw"}}>Contraseña</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</div>


					<button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onRegister}
						className="submit3">
						REGISTRARSE
          			</button>
                     
					    <Link to={ROUTES.HOMEPAGE}>
                        <button	
                        type="submit" 
                        fullWidth                     
						className="submit4">
                        IR ATRÁS </button>
                        </Link>

				</form>
			</div>
            
			
		</div>

	)

	async function onRegister() {
		try {
			await firebase.register(name, email, password)
			alert("¡Registro Exitoso!")
			
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(Register)