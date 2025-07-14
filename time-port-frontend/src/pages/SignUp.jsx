import React, { useState, useContext } from 'react';
import Logo from '../assets/image.png';
import Button from '../Components/Buttons/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';
import { UserContext } from '../Context/UserContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { users, setUsers, setCurrentUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const signupHandler = (e) => {
    e.preventDefault();

    const emailExists = Object.values(users).some(user => user.email === email);
    if (emailExists) {
      setErrorMsg('Email already registered');
      return;
    }

    const id = Date.now().toString(); // simple unique id
    const newUser = { id, username, email, password };

    const updatedUsers = { ...users, [id]: newUser };
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    navigate('/userpage');
  };

  return (
    <div className='auth-container'>
      <img src={Logo} alt="Logo" className='logo' />
      <div className='loginpage'>
        <form className="auth-form" onSubmit={signupHandler}>
          <h1>Sign Up</h1>

          <div className="input-group">
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              id="username"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
