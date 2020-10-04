import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import LoginPattern from '../pattern/LoginPattern';
import Footer from '../pattern/Footer';
import { Alert } from 'react-bootstrap';
import { withFirebase } from '../controller/firebase';

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

const SignupBase = ({firebase}) => {

// Start declare state
  const [username, setUsername] = React.useState('');

  const [password, setPassword] = React.useState('');

  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [email, setEmail] = React.useState('');

  const [confirmPasswordPrompt, setConfirmPasswordPrompt] = React.useState(false);

  const [lackOfInfo, setLackOfInfo] = React.useState(false);

  const [redirect, setRedirect] = React.useState(false);
// End declare state

// Start handle state
  const handleUsernameChange = (event) => setUsername(event.target.value);
  
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const checkUsername = () => {
    let acc = account.filter((item) => item.username===username);
    if(acc.length!==0){
      return <p className='text-danger'>Username has been used. Please choose a different name.</p>;
    }else{
      return <p className='text-success'>Valid.</p>;
    }
  }

  const handleLogInSubmit = (event) => {
    setLackOfInfo(false);
    setConfirmPasswordPrompt(false);
    if(username==='' || password==='' || confirmPassword==='' || email===''){
      setLackOfInfo(true);
      event.preventDefault();
      event.stopPropagation();
    }else{
      if(confirmPassword!==password){
        setConfirmPasswordPrompt(true);
        event.preventDefault();
        event.stopPropagation();
      }else{
        firebase.doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
          console.log(authUser);
          setRedirect(true);
        })
        .catch(err => console.log(err));
        event.preventDefault();
      }
    }
  }
// End handle state

  return <>
  <LoginPattern> 
    <div className='my-2 pb-3'><h1>Sign up Library</h1></div>
    {lackOfInfo && <Alert variant='danger'>Please fill out the form!</Alert>}
    <div className='my-3'>
      <div className='mx-2 text-left'>
        <form onSubmit={handleLogInSubmit}>
          <div className="form-group">
            <label htmlFor="uname">Username:</label>
            <input type="text" className="form-control" id="uname" placeholder="Enter username" onChange={handleUsernameChange}></input>
            {username!=='' && checkUsername()}
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={handlePasswordChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Confirm password:</label>
            <input type="password" className="form-control" id="repwd" placeholder="Enter password again" onChange={handleConfirmPasswordChange}></input>
            {confirmPasswordPrompt && <p className='text-danger'>Wrong confirm password!</p>}
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" placeholder="Enter email" id="email" onChange={handleEmailChange}></input>
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </LoginPattern>
  {redirect && <Redirect to='/signup/success'></Redirect>}
  <Footer/>
  </>    
} 

const Signup = withFirebase(SignupBase);

export default Signup;