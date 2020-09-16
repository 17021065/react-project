import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import WriteUI from './write/Write';
import SearchUI from './search/Search';
import Banner from './pattern/Banner';
import article from './img/article-24px.svg';
import Article from './search/Article';
import SearchBanner from './search/SearchBanner';

function App() {

  return (
    <Router>
    <div className="App">

    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"><img src={article} alt='Library Icon'></img>Library</Navbar.Brand>
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
    <Route path="/search/:subject" component={SearchUI}></Route>
    <Route path="/search" exact component={SearchBanner}></Route>
    <Route path="/write/:articleID" component={WriteUI}></Route>
    <Route path="/write" exact component={WriteUI}></Route>
    <Route path="/article/:articleID" component={Article}></Route>
    </div>
    </Router>
  );
}

export default App;
