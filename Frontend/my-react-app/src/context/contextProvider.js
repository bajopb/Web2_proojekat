import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

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



  return (
    <AuthContext.Provider value={{ token:token, type:userType }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;