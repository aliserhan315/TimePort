import { Outlet } from 'react-router-dom';
import Navbar from '../Components/NavBar/NavBar';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';


const Layout = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser? (<Navbar isAuthenticated={currentUser} Username={currentUser.name} Userprofile={currentUser.profile_photo}/>):
      (<Navbar/>)
      }

      <Outlet />
    </>
  );
};

export default Layout;
