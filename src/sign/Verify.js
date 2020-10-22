import React from 'react';
import { withFirebase } from '../controller/firebase';
import { NavDropdown } from 'react-bootstrap';

const VerifyButtonBase = ({firebase}) => {
  const handleEmailVerify = () => {
    firebase.doSendEmailVerification();
  }

  return <NavDropdown.Item onClick={handleEmailVerify}>Verify email</NavDropdown.Item>
}
  
const VerifyButton = withFirebase(VerifyButtonBase);

export default VerifyButton;