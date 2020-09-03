import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import WriteUI from './Write';
import SearchUI from './Search';

function App() {
  return (
    <Router>
    <div className="App">

    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Wiki App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Search</Nav.Link>
            <Nav.Link href="/write">Write</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Text>
            Signed in as: <a href="#login">Admin</a>
          </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>

    <Route path="/home" component={SearchUI}></Route>
    <Route path="/write" component={WriteUI}></Route>
    </div>
    </Router>
  );
}

export default App;
