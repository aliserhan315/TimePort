
import './SignUpBar.css'
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';



const SignUpBar = ({ onClickHandler }) => {
    const [email, setEmail] = useState('');

  const handleClick = () => {
    if (email) {
      onClickHandler(email);
    }
  };
  return ( 
          <div className="signup-inline">
            <h2>
              Sign Up for <span className="highlight">Updates</span>
            </h2>
            <div className="input-group input-overlap">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <button type="submit" onClick={handleClick}>
                signUp <FiSend />
              </button>
            </div>
          </div>
  );
};

export default SignUpBar;
