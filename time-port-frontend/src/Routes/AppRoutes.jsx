
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import CapsuleWall from '../pages/CapsuleWall';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Layout from './Layout';
import UserPage from '../pages/UserPage';

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/capsulewall" element={<CapsuleWall />} />
        <Route path="/UserPage" element={<UserPage/>} />
      </Route>

      <Route path="/login" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
