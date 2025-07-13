import React, { useContext, useState } from 'react';
import Logo from '../assets/image.png';
import Button from '../Components/Buttons/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';
import { UserContext } from '../Context/UserContext';

const LogIn = () => {
  const navigate = useNavigate();
  const { users, setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const loginHandler = (e) => {
    e.preventDefault();

    const foundUser = Object.values(users).find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      navigate('/userpage');
    } else {
      setErrorMsg('Invalid email or password');
    }
  };

  return (
    <div className='auth-container'>
      <img src={Logo} alt="Logo" className='logo' />
      <div className='loginpage'>
        <form className="auth-form" onSubmit={loginHandler}>
          <h1>Log In</h1>

          <div className="input-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
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
