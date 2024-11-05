import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('proivder for auth not found')
    }
    return context
}

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
      });

      const navigate = useNavigate()

    useEffect(() => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      }, [user]);



    const login = async (email, password) => {
    try {
      // Make a POST request with email and password
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();  
        alert(errorData)
      }

      const data = await response.json();
      
      setUser(data); 
      navigate('/')
      return data; 
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user')
    navigate('/')
  };

  const value = {
    login,
    logout,
    user, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
