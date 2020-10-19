import React from 'react';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import {withFirebase} from '../controller/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExperimentBase = ({firebase}) => {
  const [userList, setUserList] = React.useState([]);

  const handleClick = event => {
    firebase.users().once('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      setUserList(usersList);
    })
  }

  return <> 
    <PagePattern>
      <div className='table-responsive'>
        <button type='button' onClick={handleClick}>Show</button>
        <p id='demo'></p>
      </div>
      <UserList users={userList}/>
    </PagePattern>

    <Footer/>
  </>
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const Experiment = withFirebase(ExperimentBase);

export default Experiment;