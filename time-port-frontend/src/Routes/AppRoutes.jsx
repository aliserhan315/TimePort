
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CapsuleWall from '../pages/CapsuleWall';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Layout from './Layout';

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/capsulewall" element={<CapsuleWall />} />
      </Route>

      <Route path="/login" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
