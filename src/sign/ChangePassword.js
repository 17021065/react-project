import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import LoginPattern from '../pattern/LoginPattern';
import Footer from '../pattern/Footer';
import { withFirebase } from '../controller/firebase';

const ChangePasswordBase = ({firebase}) => {
// Start declare state  
  const [password, setPassword] = React.useState('');

  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [notMatch, setNotMatch] = React.useState(false);

  const [redirect, setRedirect] = React.useState(false);
// End declare state

// Start handle state
  const handleNewPasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleChangePasswordSubmit = (event) => {
    if(password!==confirmPassword){
      setNotMatch(true);
      event.stopPropagation();
    }else{
      firebase.doPasswordUpdate(password)
      .then(() => firebase.doSignOut())
      .then(() => setRedirect(true))
      .catch(err => console.log(err));
    } 
    event.preventDefault();
  }
// End handle state

  return <>
  <LoginPattern>
    <div className='my-2 pb-3'><h1>Change password</h1></div>
    {notMatch && <Alert variant='danger'>Confirm password is not match !</Alert>}
    <div className='my-3'>
      <div className='mx-2 text-left'>
        <form className="was-validated" onSubmit={handleChangePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="opwd">New password:</label>
            <input type="password" className="form-control" placeholder="Enter new password" onChange={handleNewPasswordChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label htmlFor="npwd">Confirm password:</label>
            <input type="password" className="form-control" placeholder="Confirm new password" onChange={handleConfirmPasswordChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <button type="submit" className="btn btn-primary">Confirm</button>
        </form>
      </div>
    </div>
    <div className='text-left mx-2 mt-4'>
      <p><strong>You will sign out and move to sign in page after change password.</strong></p>
    </div>
  </LoginPattern>
  {redirect && <Redirect to='/signin'></Redirect>}
  <Footer/>
  </>
}

const ChangePassword = withFirebase(ChangePasswordBase);

export default ChangePassword;