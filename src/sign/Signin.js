import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { compose } from 'recompose';
import LoginPattern from '../pattern/LoginPattern';
import Footer from '../pattern/Footer';
import { withFirebase } from '../controller/firebase';

const SigninBase = ({firebase}) => {
// *** STATE ***
  const [email, setEmail] = React.useState('');

  const [password, setPassword] = React.useState('');

  const [isNotExisted, setIsNotExisted] = React.useState(false);
  // *** CONDITION ***
  const [passIsWrong, setPassIsWrong] = React.useState(false);


// *** HANDLER ***
  const handleEmailChange = (event) => setEmail(event.target.value);
  
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogInSubmit = (event) => {
    setIsNotExisted(false);
    firebase.doSignInWithEmailAndPassword(email, password)
    .then(() => window.location.replace('/'))
    .catch(err => {
      if(err.code==='auth/user-not-found') setIsNotExisted(true);
      else if(err.code==='auth/wrong-password') setPassIsWrong(true);
      else console.log(err);
    });
    event.preventDefault();
  }

// *** RENDER ***
  return <>
  <LoginPattern> 
    <div className='my-2 pb-3'><h1>Sign in Library</h1></div>
    {isNotExisted && <Alert variant='danger'>Account is not existed!</Alert>}
    {passIsWrong && <Alert variant='danger'>Wrong password!</Alert>}
    <div className='my-3'>
      <div className='mx-2 text-left'>
        <form className="was-validated" onSubmit={handleLogInSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={handleEmailChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={handlePasswordChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className='text-left mx-2 mt-4'>
        <p>
          Forgot your password ? <a href='/forgot-password'>click here</a>.
        </p>
      </div>
      <div className='text-left mx-2 mt-4'>
        <p>
          Sign in is required for writing article.<br></br>
          If you do not have available account, sign up <a href='/signup'>here</a>.
        </p>
      </div>
    </div>
  </LoginPattern>
  <Footer/>
  </>    
} 

const Signin = compose(withFirebase)(SigninBase);

export default Signin;