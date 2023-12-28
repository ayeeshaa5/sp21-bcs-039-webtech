import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/refetch", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      console.log("refetchhh:",result)
      setUser(result)
      // if (user!=null){
      
      //   if(user.name=='JsonWebTokenError')
      // {
      //   setUser(null)
      // }
  
      // }
    } catch (err) {
      console.log('userrefetch',err);
    }
    
    
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
