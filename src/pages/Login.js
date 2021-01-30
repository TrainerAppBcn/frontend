import React, { useState, useContext, useEffect } from "react";
import Signup from "./signup";
import { withRouter } from "react-router";
import {app, googleAuthProvider,facebookAuthProvider} from "../utils/firebase/firebase.config"


const Login = ({history}) => {
    const [signup, setsignup] = useState(false);
    const [error, seterror] = useState('')

    const emailPass = async e => {
        e.preventDefault();
        const { user, password } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(user.value, password.value)
            .then(result => {
                console.log('log email y password funciona',result);
                history.push("/");
            })
            .catch(error => {
                console.log('log email password error')
                seterror(error.message)
            });
        
    };


    const socialLogin = async (provider)=>{
        await app
        .auth()
        // se puede hacer con un redirect tambien en vez de un pop up 
        .signInWithPopup(provider)
        .then(result => {
            console.log('log social funciona',result);
        })
        .catch(error => {
            console.log('log social error')
            seterror(error.message)
        });
    }



    return (
        <div>
            {!signup ? (
                <form className="login-form" onSubmit={emailPass}>
                    <h1>Ingreso</h1>
                    <input
                        name="user"
                        placeholder="Usuario"
                    />
                    <input     
                        name="password"
                        type="password"
                        placeholder="Clave"
                    />
                        <button
                    >
                                Ingresa
                    </button>
                    <button
                        onClick={() => socialLogin(googleAuthProvider)}
                    >
                        Google
                    </button>
                    <button
                        style={{ marginRight: 10 }}
                        onClick={() => socialLogin(facebookAuthProvider)}
                    >
                        Facebook
                    </button>
                </form>
            ) : (
                <Signup setsignup={setsignup} />
            )}
    </div>
            
    );
};
export default withRouter(Login);