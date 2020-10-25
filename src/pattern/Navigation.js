import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav, NavDropdown} from 'react-bootstrap';
import newspaper from '../img/newspaper.svg';
import SignoutButton from '../sign/Signout';
import VerifyButton from '../sign/Verify';

const Navigation = ({username, isVerified}) => {
  return <>
    <Navbar bg="dark" variant='dark' expand="lg">
        <Navbar.Brand href="/">
          <img src={newspaper} style={{width:25, height:25}} alt='Library Icon'></img>&nbsp;Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/write">Write</Nav.Link>
            <Nav.Link href="/experiment">Experiment</Nav.Link> */}
          </Nav>
          <Nav>      
            {username ? 
              (
                <>
                <NavDropdown title={`Signed in as: ${username}`} id="basic-nav-dropdown" alignRight={true}>
                  {!isVerified && <VerifyButton/>}
                  <NavDropdown.Item href='/change-password'>Change Password</NavDropdown.Item>
                  <SignoutButton/>
                </NavDropdown>   
                </> 
              ):(
                <Nav.Link href="/signin">Sign in</Nav.Link> 
              )
            }
          </Nav>   
        </Navbar.Collapse>
    </Navbar>
  </>
}

export default Navigation;