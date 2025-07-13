import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Buttons/Buttons';
import './NavBar.css';
import emptyPfp from '../../assets/emptypfp.png';

const Navbar = ({ isAuthenticated = false, Username, Userprofile }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
     
        <div className="logo" onClick={() => navigate('/')}>TimePort</div>
     

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/capsulewall" onClick={closeMenu}>Capsule-Wall</Link>
         {isAuthenticated ? (  <Link to="/userpage" onClick={closeMenu}>User-Page</Link>)
         :
      
         ( <div className='mobile-auth-links'>
          <Link to="/login" className='mobile-auth' onClick={closeMenu}>Sign In</Link>
           <Link to="/signup" className='mobile-auth' onClick={closeMenu}>Sign Up</Link>
           </div>)}



      
        
        
      </div>

      {isAuthenticated ? (
      
         
        <div className="user-info" onClick={() => navigate("/UserPage")}>
          <img src={Userprofile || emptyPfp} alt="User profile" className="user-avatar" />
          
          <span className="username">{Username}</span>
          </div>
      
      ) : (
        
        <div className="navbar-buttons">
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button buttonType="inverted" onClick={() => navigate('/signUp')}>Register</Button>
          </div>
     
      )}

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={handleToggle}>
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
};

export default Navbar;
