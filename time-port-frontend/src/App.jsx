
import './Styles/App.css';

import AppRoutes from './Routes/AppRoutes';
import { UserProvider } from './Context/UserContext';
import { CapsuleProvider } from './Context/CapsuleContext';


const  App=()=> {
  return (
    <UserProvider>
      <CapsuleProvider>
           <AppRoutes/>
      </CapsuleProvider>

   </UserProvider>
    
  );
}

export default App;
