import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { compose } from 'recompose';
import LoginPattern from '../pattern/LoginPattern';
import Footer from '../pattern/Footer';
import { withFirebase } from '../controller/firebase';

const SigninBase = ({firebase, history}) => {
// Start declare state
  const [email, setEmail] = React.useState('');

  const [password, setPassword] = React.useState('');

  const [prompt, setPrompt] = React.useState(undefined);
// End declare state

// Start handle state
  const handleEmailChange = (event) => setEmail(event.target.value);
  
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogInSubmit = (event) => {
    /* let acc = account.filter((item) => item.username === username);
    if(acc.length===0){
      setPrompt('Your username does not exist!')
    }else{} */
      firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => window.location.replace('/'))
      .catch(err => console.log(err));
    
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