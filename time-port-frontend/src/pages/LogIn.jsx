import React, { useContext, useState } from 'react';
import Logo from '../assets/image.png';
import Button from '../Components/Buttons/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';
import { UserContext } from '../Context/UserContext';
import { loginUser } from '../api';

const LogIn = () => {
  const navigate = useNavigate();
  const { setAuthToken, setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

const loginHandler = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
        const { data } = await loginUser({ email, password });
        const { payload: user } = data;
        
        setAuthToken(user.token);
        setCurrentUser(user);
        navigate('/userpage');
    } catch (error) {
        console.error('Login error:', error);

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
        <form className="auth-form" onSubmit={loginHandler}>
          <h1>Log In</h1>

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

          <Button type="submit" className="auth-form button">
            Log In
          </Button>

          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
