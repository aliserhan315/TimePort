import { Outlet } from 'react-router-dom';
import Navbar from '../Components/NavBar';

const Layout = () => {
  return (
    <>
      <Navbar  isAuthenticated="true" Username={'ali'}/>
      <Outlet />
    </>
  );
};

export default Layout;
