import React from 'react';
import { withFirebase } from '../controller/firebase';
import { NavDropdown } from 'react-bootstrap';

const SignoutButtonBase = ({firebase}) => {
  const handleSignOut = () => {
    firebase.doSignOut();
    window.location.replace('/signin');
  }

  return <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
}
  
const SignoutButton = withFirebase(SignoutButtonBase);

export default SignoutButton;