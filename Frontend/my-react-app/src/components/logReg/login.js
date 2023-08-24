import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios.js"
import AuthContext from "../../context/contextProvider.js";
import { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";

const Login=()=>{
    const [credentials, setCredentials]=useState({
        email:"",
        password:""
    });
    const context=useContext(AuthContext);
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!credentials.email && !credentials.password)
        {
            alert("Oba polja su obavezna");
        }
        if(!credentials.email){
            alert("Unesite email")
        }
        if(!credentials.password){
            alert("Unseite lozinku");
        }
        await context.onLogin(credentials);    
    };

   
    const handleGoogleSignIn = async (e) => {
        await context.googleLogin(e);
      }
    return(
        
        <div className="fullPageDiv">
            <div className="formDiv">
                <form onSubmit={handleSubmit}>
                    <div className="usernameDiv">
                    <label>Unesite email</label>
                    <input type="text" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')} name="username" onChange={(e)=>setCredentials({...credentials, email:e.target.value})} value={credentials.email }/>
                    </div> 
                    <div className="passwordDiv">
                    <label>Unesite lozinku</label>
                    <input type="password" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')} name="password" value={credentials.password} onChange={(e)=>setCredentials({...credentials, password:e.target.value})}/>
                    </div>
                    <div className="submitDiv">
                        <button type="submit">Login</button>
                    </div>
                    <div className="linkDiv">
                        Niste registrovani? <Link to="/registration">Registrujte se ovde</Link>
                    </div>
                    <div>
        <GoogleLogin onSuccess={handleGoogleSignIn} onError={e => alert("Invalid google email.")}/>
      </div>
                </form>
            </div>
        </div>
    );
};

export default Login;