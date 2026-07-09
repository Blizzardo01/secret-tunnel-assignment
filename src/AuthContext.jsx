import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  async function signup(credentials) {
    try {
      const response = await fetch(`${API}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({credentials},)
        });

        const result = response.json();
        setToken(result.token)
        setLocation("TABLET")
    }
    catch (error){
      console.log(error)
    }

  }
  // TODO: authenticate
  const authenticate = async () => {
    try {
      if (!token) {
        throw Error("token not found.")
      }
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', 
              { 
                method: "GET", 
                headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` 
                }
              })
      if (!response.ok) {
        throw Error("Authentication has failed");
      }
      setLocation("TUNNEL");
    } catch (error){
      console.log(error);

    }
  }

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
