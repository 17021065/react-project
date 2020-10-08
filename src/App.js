import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import WriteUI from './write/Write';
import SearchUI from './search/Search';
import Banner from './pattern/Banner';
import Article from './search/Article';
import SearchBanner from './search/SearchBanner';
import Signin from './sign/Signin';
import Signup from './sign/Signup';
import SignupSuccess from './sign/SignupSuccess';
import Profile from './sign/Profile';
import Experiment from './server/Experiment';
import Navigation from './pattern/Navigation';
import ForgotPassword from './sign/ForgotPassword';
import ChangePassword from './sign/ChangePassword';
import { withAuthUser } from './controller/session';

function AppBase() {
  return (
    <Router>
    <div className="App">

    <Navigation/>

    <Route path="/" exact component={Banner}/>
    <Route path="/search/:subject" component={SearchUI}/>
    <Route path="/search" exact component={SearchBanner}/>
    <Route path="/write/:articleID" component={WriteUI}/>
    <Route path="/write" exact component={WriteUI}/>
    <Route path="/article/:articleID" component={Article}/>
    <Route path="/signin" component={Signin}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/signup/success" component={SignupSuccess}/>
    <Route path="/forgot-password" component={ForgotPassword}/>
    <Route path="/change-password" component={ChangePassword}/>
    <Route path="/profile/:username" component={Profile}/>
    <Route path="/experiment" component={Experiment}/>
    </div>
    </Router>
  );
}

const App = withAuthUser(AppBase);

export default App;