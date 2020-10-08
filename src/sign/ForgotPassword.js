import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPattern from '../pattern/LoginPattern';
import Footer from '../pattern/Footer';
import { withFirebase } from '../controller/firebase';

const ForgotPasswordBase = ({firebase}) => {
  const [email, setEmail] = React.useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleResetPasswordSubmit = (event) => {
    firebase.doPasswordReset(email)
    .then(() => setEmail(''))
    .catch(err => console.log(err));
    event.preventDefault();
  }

  return <>
  <LoginPattern>
    <div className='my-2 pb-3'><h1>Reset password</h1></div>
    <div className='my-3'>
      <div className='mx-2 text-left'>
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
      <div className='text-left mx-2 mt-4'>
        <p>A password reset mail will be sent to your email.</p>
      </div>
      <div className='text-left mx-2 mt-4'>
        <a href='/signin'>{'<< back to sign in page'}</a>
      </div>
    </div>
  </LoginPattern>

  <Footer/>
  </>
}

const ForgotPassword = withFirebase(ForgotPasswordBase);

export default ForgotPassword;