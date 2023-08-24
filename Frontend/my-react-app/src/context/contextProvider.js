import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import api from "../api/axios"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate=useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
}, []);
  

const userType = () => {
    try {
        if(!token)
            return null;
        const tokenDecoded = jwtDecode(token);
        return tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch(e) {
        console.log(e);
    }
};

const logoutHandler = () => {
  setToken(null);
  localStorage.clear();
  localStorage.removeItem('token');
  navigate("/")

};


const isType = (type) => {
  try {
      if(!token)
          return null;
      const tokenDecoded = jwtDecode(token);
      return tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === type;
  } catch(e) {
      console.log(e);
  }
}

const googleLogin = async (data) => {
  const idToken = data.credential;

  try {
    const res = await api.post('api/User/googleLogin', JSON.stringify(idToken), {
      headers: {
        'Content-Type': 'application/json' // Postavite odgovarajući Content-Type zaglavlje
      }
    });
    
    if (!res.data) {
      return;
    }

    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  } catch (e) {
    alert(e.response.data.Exception);
  }
};


const login=async(data)=>{

  try {
      const response=await api.post('api/User/Login', data);
      if(response.data.token===null || response.data.token===""){
        setToken(response.data.result);
        alert(response.data.result);
      }
      else{
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      }
  } catch (e){
      alert(e.response.data.Exception);
  }
}

  return (
    <AuthContext.Provider value={{ token:token, type:userType, onLogout:logoutHandler, onLogin:login, googleLogin: googleLogin    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;