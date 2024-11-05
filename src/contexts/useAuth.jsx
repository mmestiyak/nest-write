import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { books } from "../data/books";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider is missing in the component tree");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null); // Using useLocalStorage for user state management
  const navigate = useNavigate();

  // Login function to authenticate user
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      setUser(data); // Save user data to localStorage via useLocalStorage
      navigate("/"); // Redirect to the home page or dashboard after successful login
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  // Logout function to clear user session
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.setItem("books", JSON.stringify(books)); // Reset books data on logout
    localStorage.setItem("selectedBook", JSON.stringify({})); // Reset selectedBook on logout
    navigate("/"); // Redirect to the homepage or login page
  };

  const value = {
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
