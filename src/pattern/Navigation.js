import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav, NavDropdown} from 'react-bootstrap';
import article from '../img/article-24px.svg';
import { withAuthentication } from '../controller/session';
import SignoutButton from '../sign/Signout';

const NavigationBase = ({authUser}) => {
  return <>
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"><img src={article} alt='Library Icon'></img>Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/write">Write</Nav.Link>
            <Nav.Link href="/experiment">Experiment</Nav.Link>
          </Nav>         
            {authUser ? 
              (
                <>
                <NavDropdown title={`Signed in as: ${authUser.email}`} id="basic-nav-dropdown" alignRight={true}>
                  <NavDropdown.Item href='#'>Profile</NavDropdown.Item>
                  <NavDropdown.Item href='/change-password'>Change Password</NavDropdown.Item>
                  <SignoutButton/>
                </NavDropdown>   
                </> 
              ):(
                <Navbar.Text><a className='mx-2 text-primary' href='/signin'>Sign in</a></Navbar.Text>
              )
            }
        </Navbar.Collapse>
    </Navbar>
  </>
}

const Navigation = withAuthentication(NavigationBase);

export default Navigation;