import React from 'react';
import Logo from '../assets/image.png';
import Button from '../Components/Buttons';
import { Link } from 'react-router-dom';
import '../Styles/Auth.css';

const SignUp = () => {
  return (
    <div className='auth-container'>
      <img src={Logo} alt="Logo" className='logo' />
    <div className='loginpage'>
      
      <form className="auth-form">
        <h1>Log In</h1>
          <div className="input-group">
          <label htmlFor="Username">UserName</label>
          <input type="Username" id="Username"  placeholder='UserName' required />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email"  placeholder='Email' required />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder='Password' required />
        </div>

        <Button type="submit" className='auth-form button'>Log In</Button>

        <p>
          Don't have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
