import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import WriteUI from './write/Write';
import SearchUI from './search/Search';
import Banner from './pattern/Banner';
import Article from './search/Article';
import SearchBanner from './search/SearchBanner';
import Signin from './login/Signin';
import Signup from './login/Signup';
import SignupSuccess from './login/SignupSuccess';
import useSemiPersistentState from './controller/state/State';
import Profile from './login/Profile';
import Experiment from './server/Experiment';
import Navigation from './pattern/Navigation';
import { withFirebase } from './controller/firebase';
import { AuthUserContext } from './controller/session';

function AppBase({firebase}) {
  
  const [user, setUser] = useSemiPersistentState('user', null);

  React.useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => authUser ? setUser(authUser) : setUser(null));
    console.log(user);
  }, [user]);
  
  return (
    <AuthUserContext.Provider value={user}>
    <Router>
    <div className="App">

    <Navigation/>

    <Route path="/" exact component={Banner}></Route>
    <Route path="/search/:subject" component={SearchUI}></Route>
    <Route path="/search" exact component={SearchBanner}></Route>
    <Route path="/write/:articleID" component={WriteUI}></Route>
    <Route path="/write" exact component={WriteUI}></Route>
    <Route path="/article/:articleID" component={Article}></Route>
    <Route path="/signin" component={Signin}></Route>
    <Route path="/signup" exact component={Signup}></Route>
    <Route path="/signup/success" component={SignupSuccess}></Route>
    <Route path="/profile/:username" component={Profile}></Route>
    <Route path="/experiment" component={Experiment}></Route>
    </div>
    </Router>
    </AuthUserContext.Provider>
  );
}

const App = withFirebase(AppBase);

export default App;