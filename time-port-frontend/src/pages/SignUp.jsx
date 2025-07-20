import React, { useState, useContext } from 'react';
import Logo from '../assets/image.png';
import Button from '../Components/Buttons/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';
import { UserContext } from '../Context/UserContext';
import { useLocation } from 'react-router-dom';
import { registerUser } from '../api';

const SignUp = () => {
  const location = useLocation();
  const prefilledEmail = location.state?.prefilledEmail || ''
  const navigate = useNavigate();

  const { setCurrentUser, setAuthToken } = useContext(UserContext);

  const [username, setUsername] = useState('');
 const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

 const signupHandler = async (e) => {
        e.preventDefault();
        setErrorMsg('');

       
        try {
          const { data } = await registerUser({ username, email, password });
          const { payload: user } = data;

          setAuthToken(user.token);
          setCurrentUser(user);
          navigate('/userpage');
        }catch (error) {
          console.error('Signup error:', error);

          const message =
            error?.response?.data?.payload ||
            error?.response?.data?.message ||
            'An unexpected error occurred. Please try again.';

          setErrorMsg(message);
        }
      };


  return (
    <div className='auth-container'>
      <img src={Logo} alt="Logo" className='logo' />
      <div className='loginpage'>
        <form className="auth-form" onSubmit={signupHandler}>
          <h1>Sign Up</h1>

          <div className="input-group">
            <label  className='auth-lable' htmlFor="username">UserName</label>
            <input
              type="name"
              id="username"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className='auth-lable' htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className='auth-lable' htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && <div className="errormessage">{errorMsg}</div>}

          <Button type="submit" className='auth-form button'>Sign Up</Button>

          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
