import React from 'react';
import { Spinner } from 'react-bootstrap';
import { compose } from 'recompose';
import { withFirebase } from '../controller/firebase';
import { withAuthentication } from '../controller/session';
import LoginPattern from '../pattern/LoginPattern';

const ChangeUsernameBase = ({authUser, firebase}) => {
// *** STATE ***
  const [user, setUser] = React.useState();

  const [newName, setNewName] = React.useState();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

// *** HANDLER ***
  const handleUsernameChange = event => setNewName(event.target.value);

  const handleChangeUsernameSubmit = event => {
    firebase.user(authUser.uid).set({
      ...user,
      username: newName,
    })
    .then(() => window.location.replace('/'))
    .catch(err => {
      console.log(err);
      event.preventDefault();
    });
  }

  const handleCancel =  event => {
    window.location.replace('/');
    event.preventDefault();
  }

  React.useEffect(() => {
    if(authUser){
      setIsLoading(true);
      setIsError(false);
      firebase.user(authUser.uid).once('value', snapshot => {
        const currentUser = snapshot.val();
        console.log(currentUser);
        setUser(currentUser);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
      });
    }
  }, [authUser, firebase]);

// *** RENDER ***
  return <>
    <LoginPattern>
    <div className='mt-sm-2 pb-sm-3'><h1 style={{fontSize: 50}}>Change Username</h1></div> 
    <div className='text-left mx-sm-2 mt-sm-3' style={{fontSize: 20}}>
      Current username: {isError ? (
        <p>Something went wrong...</p>
      ):(
        isLoading ? (
          <Spinner size='sm' animation='border' style={{position: "relative", bottom: 2}}/>
        ):(
          user && <strong className='text-primary'>{user.username}</strong>
        )
      )
      }
    </div>
    <div className='mt-sm-3'>
      <div className='mx-sm-2 text-left'>
        <form className="was-validated" onSubmit={handleChangeUsernameSubmit}>
          <div className="form-group">
            <label htmlFor="opwd">New username:</label>
            <input type="text" className="form-control" placeholder="Enter new username" onChange={handleUsernameChange} required></input>
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <button type="submit" className="btn btn-primary mr-sm-2">Confirm</button>
          <button type="submit" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
    </LoginPattern>
  </>
}

const ChangeUsername = compose(withAuthentication, withFirebase)(ChangeUsernameBase);

export default ChangeUsername