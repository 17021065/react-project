import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import { withAuthentication } from '../controller/session';
import { withFirebase } from '../controller/firebase';
import { compose } from 'recompose';
import WriteList from './WriteList';

const ProfileBase = ({authUser, firebase}) => {
// *** STATE ***  
  const [user, setUser] = React.useState();

  const [userIsLoading, setUserIsLoading] = React.useState(false);

  const [userIsError, setUserIsError] = React.useState(false);

  const [writeList, setWriteList] = React.useState([]);

// *** HANDLER ***
  React.useEffect(() => {
    setUserIsError(false);
    setUserIsLoading(true);

    // *** LOAD USER INFO ***

    !!authUser && firebase.user(authUser.uid).once('value', snapshot => {
      const currentUser = snapshot.val();
      !!currentUser && setUser(currentUser.username);
    })
    .then(() => setUserIsLoading(false))
    .catch(err => {
      console.log(err);
      setUserIsError(true);
    });

    // *** LOAD USER STAT ***
    
    firebase.articles().once('value', snapshot => {
      const writeListObject = snapshot.val();
      const _writeArray = Object.keys(writeListObject).map(key => ({
        ...writeListObject[key],
        aid: key,
      }));
      const writeArray = _writeArray.filter(item => item.author_id === authUser.uid);
      setWriteList(writeArray);
    });
  }, [authUser, firebase]);
console.log(writeList);
  const handleEmailVerify = event => firebase.doSendEmailVerification();

// *** RENDER ***
  return <> 
    <PagePattern>
      <div className='m-3 text-left'>
        <h1>Information</h1>
        <div className='my-3 pt-2 pl-3' style={{fontSize: 23}}>
          {userIsError ? (
            <p>Something went wrong...</p>
          ):(
            userIsLoading ? (
              <Spinner animation="border"/>
            ):(
              <>
              <label style={{width: 80}}>Name:</label>{user}
              <br></br>
              <label style={{width: 80}}>Email:</label>{authUser.email}
              {!authUser.emailVerified && <button onClick={handleEmailVerify}>Email verify</button>}
              </>
            )
          )}
        </div>
      </div>
      <br></br>
      <h1 className='text-left mx-3 mb-3'>Statistics</h1>
      <div className='mx-1 text-left row'>
        <WriteList list={writeList}/>
      </div>
    </PagePattern>

    <Footer/>
  </>
}

const Profile = compose(withFirebase, withAuthentication)(ProfileBase);

export default Profile;