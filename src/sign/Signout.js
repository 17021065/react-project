import React from 'react';
import { withFirebase } from '../controller/firebase';
import { NavDropdown } from 'react-bootstrap';

const SignoutButtonBase = ({firebase}) => {
    return <NavDropdown.Item onClick={() => firebase.doSignOut()}>Sign out</NavDropdown.Item>
  }
  
const SignoutButton = withFirebase(SignoutButtonBase);

export default SignoutButton;