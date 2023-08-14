import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token' || null));
  const navigate=useNavigate();

  

const userType = () => {
    try {
        if(!token)
            return null;
        const tokenDecoded = jwtDecode(token);
        console.log(tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        console.log(tokenDecoded);
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

  return (
    <AuthContext.Provider value={{ token:token, type:userType, onLogout:logoutHandler}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;