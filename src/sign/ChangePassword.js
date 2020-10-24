import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import LoginPattern from '../pattern/LoginPattern';
import { withFirebase } from '../controller/firebase';

const ChangePasswordBase = ({firebase}) => {
// *** STATE *** 
  const [password, setPassword] = React.useState('');

  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [notMatch, setNotMatch] = React.useState(false);

// *** HANDLER ***
  const handleNewPasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleChangePasswordSubmit = (event) => {
    if(password!==confirmPassword){
      setNotMatch(true);
      event.stopPropagation();
    }else{
      firebase.doPasswordUpdate(password)
      .then(() => firebase.doSignOut())
      .then(() => window.location.replace('/signin'))
      .catch(err => console.log(err));
    } 
    event.preventDefault();
  }

  const handleCancel = event => {
    window.location.replace('/');
  }

// *** RENDER ***
  return <>
  <LoginPattern>
    <div className='mt-sm-2 pb-sm-3'><h1 style={{fontSize: 50}}>Change password</h1></div>
    {notMatch && <Alert variant='danger'>Confirm password is not match!</Alert>}
    <div className='mt-sm-3'>
      <div className='mx-sm-2 text-left'>
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
          <button type="submit" className="btn btn-primary mr-sm-2">Confirm</button>
          <button type="submit" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
    <br></br>
    <div className='text-left mx-sm-2 mt-sm-4'>
      <Alert variant='warning'>Warning: You will sign out and move to sign in page after change password.</Alert>
    </div>
  </LoginPattern>
  </>
}

const ChangePassword = withFirebase(ChangePasswordBase);

export default ChangePassword;