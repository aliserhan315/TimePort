import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Buttons/Buttons';
import './NavBar.css';
import emptyPfp from '../../assets/emptypfp.png';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import UserProfilePopup from '../UserPopUp/UserPopUp';

const Navbar = ({ isAuthenticated = false, Username, Userprofile }) => {
    const BaseURL='http://localhost:8000';

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  }
  const { currentUser,setCurrentUser } = useContext(UserContext);
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
         {isAuthenticated ? ( 
           <div className=' mobile-auth-links'>
          <Link to="/userpage"onClick={closeMenu}>User-Page</Link>
          <Link onClick={() => {  navigate('/capsulewall');closeMenu() ;setCurrentUser(null);}} className='mobile-auth'>Logout</Link>
           </div>
           )
         :
      
         ( <div className='mobile-auth-links'>
          <Link to="/login" className='mobile-auth' onClick={closeMenu}>Sign In</Link>
           <Link to="/signup" className='mobile-auth' onClick={closeMenu}>Sign Up</Link>
           </div>)}



      
        
        
      </div>

      {isAuthenticated ? (
        <div>
      
    
        <div className="user-info">
             
          <img
              src= { currentUser.profile_photo?  `${BaseURL}${currentUser?.profile_photo}` : emptyPfp}
              alt="User profile"
              className="user-avatar"
              onClick={handleProfileClick}
            />
                      
          <span  onClick={handleProfileClick} className="username">{Username}</span>
            <Button className="logout-btn" onClick={() => {setCurrentUser(null);    navigate('/capsulewall');}}>logOut</Button>
            {showProfilePopup && (
              <UserProfilePopup onClose={() => setShowProfilePopup(false)} />)}
          </div>
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
