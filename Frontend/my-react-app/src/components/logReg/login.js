import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";



const Login=()=>{

    const [credentials, setCredentials]=useState({
        username:"",
        password:""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
    
      };

    

    return(
        <div className="fullPageDiv">
            <div className="formDiv">
                <form onSubmit={handleSubmit}>
                    <div className="usernameDiv">
                    <label>Unesite email ili korisnicko ime</label>
                    <input type="text" required onInvalid={(e) => e.target.setCustomValidity('Ovo polje je obavezno')} onInput={(e) => e.target.setCustomValidity('')} name="username" onChange={(e)=>setCredentials({...credentials, username:e.target.value})} value={credentials.username }/>
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