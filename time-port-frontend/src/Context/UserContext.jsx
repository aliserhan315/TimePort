import { createContext,useState,useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(()=>
    {const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) :
   null;
});
   useEffect(() => {
  if (currentUser) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else {
    localStorage.removeItem("currentUser");
  }
}, [currentUser]);

    useEffect(() => {
        axios.get('/data/users.json').then((res)=>{
             const userMap = {};
        res.data.forEach(user => {
          userMap[user.id] = user;
        });
         setUsers(userMap);
      
         })
    }, []);
    const value = {
    users,
    setUsers,
    currentUser,
    setCurrentUser
  };

     return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

