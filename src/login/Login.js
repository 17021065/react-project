import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import LoginPattern from '../pattern/LoginPattern';
import Footer from '../pattern/Footer';

let account = [
  {
    id: 1,
    username: 'root',
    password: '1',
    email: 'root1234@gmail.com',
  },
  {
    id: 2,
    username: 'brand',
    password: '1',
    email: 'brand5678@gmail.com',
  },    
]

const Login = ({handleSetUser}) => {
// Start declare state
  const [username, setUsername] = React.useState('');

  const [password, setPassword] = React.useState('');

  const [prompt, setPrompt] = React.useState(undefined);

  const [redirect, setRedirect] = React.useState(false);
// End declare state

// Start handle state
  const handleUsernameChange = (event) => setUsername(event.target.value);
  
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogInSubmit = (event) => {
    let acc = account.filter((item) => item.username === username);
    if(acc.length===0){
      setPrompt('Your username does not exist!')
    }else{
      if(acc[0].password===password){
        handleSetUser(acc[0].username);
        setRedirect(true);
      }else{
        setPrompt('Wrong password!');
      }
    }
    event.preventDefault();
  }
// End handle state

  return <>
  <LoginPattern> 
    <div className='my-2 pb-3'><h1>Sign in Library</h1></div>
    {prompt && <Alert variant='danger'>{prompt}</Alert>}
    <div className='my-3'>
      <div className='mx-2 text-left'>
        <form className="was-validated" onSubmit={handleLogInSubmit}>
          <div className="form-group">
            <label htmlFor="uname">Username:</label>
            <input type="text" className="form-control" id="uname" placeholder="Enter username" name="uname" onChange={handleUsernameChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={handlePasswordChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className='text-left mx-2 mt-4'>
        <p>
          Sign in is required for writing article.<br></br>
          If you do not have available account, sign up <a href='/signup'>here</a>.
        </p>
      </div>
    </div>
  </LoginPattern>
  {redirect && <Redirect to='/'></Redirect>}
  <Footer/>
  </>    
} 

export default Login;