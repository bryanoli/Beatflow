import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();


export default function useAuthen(code){
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() =>{
        axios.post('http://localhost:3001/auth/login-spotify', {
            code,
        }).then(res => {
          console.log(res.data);
          setAccessToken(res.data.access_token);
          setRefreshToken(res.data.refresh_token);
          setExpiresIn(res.data.expires_in);
          windows.history.pushState({}, null, '/');
        }).catch(() => {
          window.location = '/';
          // Handle the error, such as redirecting the user to an error page or showing an error message
        });
    }, [code]);

    useEffect(() => {
      
    }, [refreshToken, expiresIn]);

    return accessToken;
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
