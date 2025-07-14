import { createContext,useState,useEffect } from "react";
import axios from "axios";

export const CapsuleContext = createContext();


export const CapsuleProvider = ({ children }) => {
    const [capsules, setCapsules] = useState([]);
   
     const value = {capsules,setCapsules}

    useEffect(() => {
        axios.get('/data/capsules.json').then((res)=>{
            setCapsules(res.data);
          
         })
    }, []);

     return (
    <CapsuleContext.Provider value={value}>
      {children}
    </CapsuleContext.Provider>
  );
};

