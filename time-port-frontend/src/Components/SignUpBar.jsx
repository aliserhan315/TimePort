
import '../Styles/SignUpBar.css'
import { FiSend } from 'react-icons/fi';


const SignUpBar = ({ onClickHandler }) => {
  return ( 
          <div className="signup-inline">
            <h2>
              Sign Up for <span className="highlight">Updates</span>
            </h2>
            <div className="input-group input-overlap">
              <input type="email" placeholder="Email" />
              <button type="submit" onClick={onClickHandler}>
                signUp <FiSend />
              </button>
            </div>
          </div>
  );
};

export default SignUpBar;
