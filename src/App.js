import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { compose } from 'recompose';
import WriteForm from './write/Write';
import Searcher from './search/Search';
import Banner from './pattern/Banner';
import Article from './search/Article';
import SearchBanner from './search/SearchBanner';
import Signin from './sign/Signin';
import Signup from './sign/Signup';
import SignupSuccess from './sign/SignupSuccess';
import Profile from './info/Profile';
import Experiment from './info/Experiment';
import Navigation from './pattern/Navigation';
import Sidebar from './pattern/Sidebar';
import ForgotPassword from './sign/ForgotPassword';
import ChangePassword from './sign/ChangePassword';
import { withAuthentication, withAuthUser } from './controller/session';
import { withFirebase } from './controller/firebase';

const Main = ({firebase, authUser}) => {
// *** USERNAME ***
  const [username, setUsername] = React.useState();

  const [isVerified, setIsVerified] = React.useState(false);
  
  React.useEffect(() => {
    !!authUser && firebase.user(authUser.uid).on('value', snapshot => {
      const currentUser = snapshot.val();
      !!currentUser && setUsername(currentUser.username);
      setIsVerified(authUser.emailVerified);
    });
  }, [authUser, firebase]);

// *** RENDER ***
  return <>
    <Router>
    <div className="App">

    <Navigation username={username} isVerified={isVerified}/>

    <div className='row bg-light'>
      <div className='col-2 bg-dark pt-3'>
        <Sidebar/>
      </div>
      <div className='col-10'>
      <Route path="/" exact component={Banner}/>
      <Route path="/search/:subject" component={Searcher}/>
      <Route path="/search" exact component={SearchBanner}/>
      <Route path="/write/:id" component={WriteForm}></Route>
      <Route path="/write" exact component={WriteForm}/>
      <Route path="/article/:id" component={Article}/>
      <Route path="/signin" component={Signin}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/signup/success" component={SignupSuccess}/>
      <Route path="/forgot-password" component={ForgotPassword}/>
      <Route path="/change-password" component={ChangePassword}/>
      <Route path="/profile/:id" component={Profile}/>
      <Route path="/experiment" component={Experiment}/>
      </div>
    </div>
    
    </div>
    </Router>
  </>
}

const AppBase = compose(withFirebase, withAuthentication)(Main);

const App = compose(withAuthUser)(AppBase);

export default App;