import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import LoginPattern from '../pattern/LoginPattern';
import { withFirebase } from '../controller/firebase';

const ForgotPasswordBase = ({firebase}) => {
  const [email, setEmail] = React.useState('');

  const [userNotFound, setUserNotFound] = React.useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleResetPasswordSubmit = (event) => {
    setUserNotFound(false);
    firebase.doPasswordReset(email)
    .then(() => setEmail(''))
    .catch(err => {
      if(err.code==='auth/user-not-found'){
        setUserNotFound(true);
      }else{
        console.log(err);
      }
    });
    event.preventDefault();
  }

  return <>
  <LoginPattern>
    <div className='my-sm-2 pb-sm-3'><h1 style={{fontSize: 50}}>Reset password</h1></div>
    {userNotFound && <Alert variant='danger'>There is no user record corresponding to this identifier.</Alert>}
    <div className='my-sm-3'>
      <div className='mx-sm-2 text-left'>
        <form className="was-validated" onSubmit={handleResetPasswordSubmit}>
          <div className="form-group">
            <label htmlFor="uname">Email:</label>
            <input type="email" className="form-control" value={email} placeholder="Enter your email" onChange={handleEmailChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
      <br></br>
      <div className='text-left ml-sm-2'>
        <p>A password reset mail will be sent to your email.</p>
      </div>
      <div className='text-left ml-sm-2 mt-sm-4'>
        <a href='/signin'>{'<< back to sign in page'}</a>
      </div>
    </div>
  </LoginPattern>
  </>
}

const ForgotPassword = withFirebase(ForgotPasswordBase);

export default ForgotPassword;