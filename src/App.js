import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import WriteUI from './Write/Write';
import SearchUI from './Search/Search';
import Banner from './Home/Home';
import article from './img/article-24px.svg';

function App() {
  return (
    <Router>
    <div className="App">

    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"><img src={article} alt='libraryIcon'></img>Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/write">Write</Nav.Link>
          </Nav>
          <Navbar.Text>
            Signed in as: <a href="#login">Admin</a>
          </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>

    <Route path="/" exact component={Banner}></Route>
    <Route path="/search" component={SearchUI}></Route>
    <Route path="/write" component={WriteUI}></Route>
    </div>
    </Router>
  );
}

export default App;
