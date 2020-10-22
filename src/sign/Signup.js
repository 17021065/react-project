import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPattern from '../pattern/LoginPattern';
import Footer from '../pattern/Footer';
import { Alert } from 'react-bootstrap';
import { withFirebase } from '../controller/firebase';
import { compose } from 'recompose';

const SignupBase = ({firebase}) => {

// *** STATE ***
  const [username, setUsername] = React.useState('');

  const [password, setPassword] = React.useState('');

  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [email, setEmail] = React.useState('');

  // *** CONDITION ***
  const [passIsNotMatch, setPassIsNotMatch] = React.useState(false);

  const [lackOfInfo, setLackOfInfo] = React.useState(false);

  const [passIsWeak, setPassIsWeak] = React.useState(false);

  const [emailIsUsed, setEmailIsUsed] = React.useState(false);

// *** HANDLER ***
  const handleUsernameChange = (event) => setUsername(event.target.value);
  
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleFormSubmit = (event) => {
    setLackOfInfo(false);
    setPassIsNotMatch(false);
    setPassIsWeak(false);
    setEmailIsUsed(false);
    if(username==='' || password==='' || confirmPassword==='' || email===''){
      setLackOfInfo(true);
      event.stopPropagation();
    }else{
      if(confirmPassword!==password){
        setPassIsNotMatch(true);
        event.stopPropagation();
      }else{
        firebase.doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
          return firebase.user(authUser.user.uid).set({username, email});
        })
        .then(() => {
          return firebase.doSendEmailVerification();
        })
        .then(() => window.location.replace('/'))
        .catch(err => {
          if(err.code==='auth/email-already-in-use') setEmailIsUsed(true);
          else if(err.code==='auth/weak-password') setPassIsWeak(true);
          else console.log(err);
        });
      }
    }
    event.preventDefault();
  }

// *** RENDER ***
  return <>
  <LoginPattern> 
    <div className='my-2 pb-3'><h1>Sign up Library</h1></div>
    {lackOfInfo && <Alert variant='danger'>Please fill out the form!</Alert>}
    <div className='my-3'>
      <div className='mx-2 text-left'>
        <form onSubmit={handleFormSubmit}>
          <div className='form-group'>
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" placeholder="Enter email" id="email" onChange={handleEmailChange}></input>
            {emailIsUsed && <p className='text-danger'>Email has been used!</p>}
          </div>
          <div className="form-group">
            <label htmlFor="uname">Username:</label>
            <input type="text" className="form-control" id="uname" placeholder="Enter username" onChange={handleUsernameChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={handlePasswordChange}></input>
            {passIsWeak && <p className='text-danger'>Password should be at least 6 characters!</p>}
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Confirm password:</label>
            <input type="password" className="form-control" id="repwd" placeholder="Enter password again" onChange={handleConfirmPasswordChange}></input>
            {passIsNotMatch && <p className='text-danger'>Wrong confirm password!</p>}
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </LoginPattern>
  <Footer/>
  </>    
} 

const Signup = compose(withFirebase)(SignupBase);

export default Signup;