import React from 'react';
import AuthUserContext from './Context';
import { withFirebase } from '../firebase';
import useSemiPersistentState from '../state';

const withAuthUser = Component => {
  const _withAuthUser = (props) => {
    const [user, setUser] = useSemiPersistentState('user', null);

    React.useEffect(() => {
      props.firebase.auth.onAuthStateChanged(authUser => authUser ? setUser(authUser) : setUser(null));
    }, [user]);

    return <AuthUserContext.Provider value={user}>
      <Component {...props}/>
    </AuthUserContext.Provider>
  }

  return withFirebase(_withAuthUser); 
}

const withAuthentication = Component => props => (
  <AuthUserContext.Consumer>
    {user => <Component {...props} authUser={user}/>}
  </AuthUserContext.Consumer>
);

export {withAuthentication, withAuthUser};