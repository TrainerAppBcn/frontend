import React, { useState } from "react";
import {app} from "../utils/firebase/firebase.config"
import { withRouter } from "react-router";

const Signup = () => {
    const [error, seterror] = useState("");
    const handleSignUp = async e => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        console.log('email', email.value, 'pass', password.value)

        await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(result => {
                console.log('registrado en firebase');
                
            })
            .catch(error => {
                console.log(error)
                // si quieres enviar el error por el front de porque no funciona el log in 
                seterror(error.message);
            });
    };
    return (
        <form onSubmit={handleSignUp}>
        
                <h1>Registro</h1>
                <input
                    name="email"
                    placeholder="Registra un Usuario"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Registra una Clave"
                />
                <button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ marginRight: 10 }}
                >
                    Registrate
                </button>
        </form>
    );
};

export default withRouter(Signup)