import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import { withFirebase } from '../controller/firebase';
import { compose } from 'recompose';
import WriteList from './WriteList';

const ProfileBase = ({match, firebase}) => {
// *** STATE ***  
  const [user, setUser] = React.useState();

  const [contactMail, setContactMail] = React.useState();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  const [writeList, setWriteList] = React.useState([]);

// *** HANDLER ***
  React.useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    // *** LOAD USER INFO ***

    firebase.user(match.params.id).once('value', snapshot => {
      const userInfo = snapshot.val();
      setUser(userInfo.username);
      setContactMail(userInfo.email);
    })
    .then(() => {

      // *** LOAD USER STAT ***

      firebase.articles().once('value', snapshot => {
        const writeListObject = snapshot.val();
        const _writeArray = Object.keys(writeListObject).map(key => ({
          ...writeListObject[key],
          aid: key,
        }));
        const writeArray = _writeArray.filter(item => item.author_id === match.params.id);
        setWriteList(writeArray);
      });
    })
    .then(() => setIsLoading(false))
    .catch(err => {
      console.log(err);
      setIsError(true);
    }); 
  }, [match, firebase]);
  
// *** RENDER ***
  return <> 
    <PagePattern>
      <div className='m-3 text-left'>
        <h1>Information</h1>
        <div className='my-3 pt-2 pl-3' style={{fontSize: 23}}>
          {isError ? (
            <p>Something went wrong...</p>
          ):(
            isLoading ? (
              <Spinner animation="border"/>
            ):(
              <>
              <label style={{width: 80}}>Name:</label>{user}
              <br></br>
              <label style={{width: 80}}>Email:</label>{contactMail}
              </>
            )
          )}
        </div>
      </div>
      <br></br>
      <h1 className='text-left mx-3 mb-3'>Statistics</h1>
      <div className='mx-1 text-left'>
        <WriteList list={writeList}/>
      </div>
    </PagePattern>

    <Footer/>
  </>
}

const Profile = compose(withFirebase)(ProfileBase);

export default Profile;