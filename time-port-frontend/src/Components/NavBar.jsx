import { Link } from 'react-router-dom';
import Button from './Buttons';
import { useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css'; 
import emptyPfp from '../assets/emptypfp.png'; 


const Navbar = ({ isAuthenticated = false, Username, Userprofile }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <nav>
        <div className='nav-logo'>
        <div className="logo" onClick={() => navigate('/')}>
          TimePort
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/capsulewall">Capsule Wall</Link>
        </div>
        </div>
      </nav>
      

      {isAuthenticated ? (
        <div className="user-info">
          <img src={Userprofile||emptyPfp} alt='UserProfile' className="user-avatar" />
          <span>{Username}</span>
        </div>
      ) : (
        <div className="navbar-buttons">
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button buttonType="inverted" onClick={() => navigate('/signUp')}>Register</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
