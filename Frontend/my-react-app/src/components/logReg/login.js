import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios.js"
import AuthContext from "../../context/contextProvider.js";
import { useContext } from "react";

const Login=()=>{
    const [credentials, setCredentials]=useState({
        email:"",
        password:""
    });
    const context=useContext(AuthContext);
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result=await api.post('api/User/login', credentials)
        if(result.status===200){
            localStorage.setItem('token', result.data.token)
            console.log(result.data.token);
            navigate('/dashboard');
        }
        };

    

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
                </form>
            </div>
        </div>
    );
};

export default Login;