import React, { useState } from 'react'
import {Input, InputLabel } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import * as ROUTES from "../Routes/Routes";
import "./Register.css";
import app from "firebase/app";
import "firebase/auth";



function Register(props) {
		
	app.auth().onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/");
        }
    });


	const [name, setName] = useState('')
	const [apellido, setApellido] = useState('')
	const [usuario, setUsuario] = useState('')
	const [cedula, setCedula] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rol, setRol] = useState('')


	const onRegister = e => {
        e.preventDefault();

        try {

            app.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.datosDB(
                        name,
                        apellido,
                        usuario,
                        email,
						cedula,
						password
                    );
 
                    setName("");
                    setApellido("");
                    setUsuario("");
                    setEmail("");
                    setPassword("");
                    setCedula("");
                    alert("Bien hecho")
                })
                
        } catch (error) {
            console.log(error.toString());
        }
    };
	

	

	return (
		<div className="telematica" style={{width:'100vw', height:'100vh'}}>
		<div className="col">
        <div className="bodyp"></div>
		</div>
		<div className="primero2">
		<div className="claseUno2">
		
       			</div>
				<form className="form" onSubmit={e => e.preventDefault() && false }>
				<div className="registrarse" style={{color: "black", fontSize: "20px", marginLeft:"5vw"}}>Registrarse:</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="name" style={{marginLeft:"5vw"}}>Nombre</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="name" style={{marginLeft:"5vw"}}>Apellido</InputLabel>
						<Input id="apellido" name="apellido" autoComplete="off" value={apellido} onChange={e => setApellido(e.target.value)}  />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="name" style={{marginLeft:"5vw"}}>Cédula</InputLabel>
						<Input id="cedula" name="cedula" autoComplete="off" value={cedula} onChange={e => setCedula(e.target.value)}  />
					</div>

					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="name" style={{marginLeft:"5vw"}}>Usuario (apodo)</InputLabel>
						<Input id="usuario" name="usuario" autoComplete="off" value={usuario} onChange={e => setUsuario(e.target.value)}  />
					</div>
					
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="email" style={{marginLeft:"5vw"}}>Correo Electrónico</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="password" style={{marginLeft:"5vw"}}>Contraseña</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</div>
					<div className="options" margin="normal" required fullWidth style={{marginLeft:"5vw"}}>
					<InputLabel htmlFor="name" >Seleccione su rol</InputLabel>
					<select className="menu">
							<option value="medico" >Médico</option>
							<option value="ayudante">Ayudante</option>

                	</select>

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

	}
	
export default withRouter(Register)