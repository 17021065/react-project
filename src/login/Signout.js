import React from 'react';
import { withFirebase } from '../controller';
import { NavDropdown } from 'react-bootstrap';

const SignoutButtonBase = ({firebase}) => {
    return <NavDropdown.Item onClick={() => firebase.doSignOut()}>Sign out</NavDropdown.Item>
  }
  
const SignoutButton = withFirebase(SignoutButtonBase);

export default SignoutButton;