import { createContext,useState,useEffect } from "react";


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(()=>
    {const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) :
   null;
});
  const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem("jwt_token");
    });

   useEffect(() => {
  if (currentUser) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else {
    localStorage.removeItem("currentUser");
  }
}, [currentUser]);

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("jwt_token", authToken);
        } else {
            localStorage.removeItem("jwt_token");
        }
    }, [authToken]);
   
    const value = {
      currentUser,
      setCurrentUser,
      authToken,
      setAuthToken
  };

     return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

