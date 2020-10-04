import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav, NavDropdown} from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import WriteUI from './write/Write';
import SearchUI from './search/Search';
import Banner from './pattern/Banner';
import article from './img/article-24px.svg';
import Article from './search/Article';
import SearchBanner from './search/SearchBanner';
import Signin from './login/Signin';
import Signup from './login/Signup';
import SignupSuccess from './login/SignupSuccess';
import useSemiPersistentState from './controller/State';
import Profile from './login/Profile';
import Experiment from './server/Experiment';
import SignoutButton from './login/Signout';

function App() {
  
  const [user, setUser] = useSemiPersistentState('user', '');

  const logOutRequest = () => setUser('');
  
  const handleSetUser = (username) => setUser(username);

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
            <Nav.Link href="/experiment">Experiment</Nav.Link>
          </Nav>         
            {user !== '' ? 
              (
                <>
                <NavDropdown title={`Signed in as: ${user}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href={`/profile/${user}`}>Profile</NavDropdown.Item>
                  <SignoutButton/>
                </NavDropdown>   
                </> 
              ):(
                <Navbar.Text><a className='mx-2 text-primary' href='/login'>Sign in</a></Navbar.Text>
              )
            }
        </Navbar.Collapse>
    </Navbar>

    <Route path="/" exact component={Banner}></Route>
    <Route path="/search/:subject" component={SearchUI}></Route>
    <Route path="/search" exact component={SearchBanner}></Route>
    <Route path="/write/:articleID" component={WriteUI}></Route>
    <Route path="/write" exact component={WriteUI}></Route>
    <Route path="/article/:articleID" component={Article}></Route>
    <Route path="/signin"><Signin handleSetUser={handleSetUser}/></Route>
    <Route path="/signup" exact component={Signup}></Route>
    <Route path="/signup/success" component={SignupSuccess}></Route>
    <Route path="/profile/:username" component={Profile}></Route>
    <Route path="/experiment" component={Experiment}></Route>
    </div>
    </Router>
  );
}

export default App;