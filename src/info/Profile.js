import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card} from 'react-bootstrap';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import database from '../database';
import { withAuthentication } from '../controller/session';
import { withFirebase } from '../controller/firebase';
import { compose } from 'recompose';

const ProfileBase = ({authUser, firebase}) => {
  return <> 
    <PagePattern>
      <div className='m-3 text-left'>
        <h1>Information</h1>
        <div className='my-3 border pt-2 pl-3' style={{fontSize: 23}}>
          <label style={{width: 70}}>User:</label><Highlight>{authUser.email}</Highlight>
          <br></br>
          <label style={{width: 70}}>Email:</label>{authUser.email}
        </div>
      </div>
      {!authUser.emailVerified && <button onClick={() => firebase.doSendEmailVerification()}>Email verify</button>}
      <br></br>
      <h1 className='text-left mx-3 mb-3'>Statistics</h1>
      <div className='mx-1 text-left row'>
        <div className='col-6 shadow-sm p-3'>
          <p style={{fontSize: 25}}>Articles written: <Highlight>1000</Highlight></p>
          {database.map((item)=>
            <Card className='bg-light'>
              <Card.Body>
                <Card.Link href={`/article/${item.subject}`}>{item.subject}</Card.Link>
                <Card.Text>{new Date().toString()}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
        <div className='col-6 shadow-sm p-3'>
          <p style={{fontSize: 25}}>Articles edited: <Highlight>2000</Highlight></p>
          {database.map((item)=>
            <Card className='bg-light'>
              <Card.Body>
                <Card.Link href={`/article/${item.subject}`}>{item.subject}</Card.Link>
                <Card.Text>{new Date().toString()}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </PagePattern>

    <Footer/>
  </>
}

const Highlight = ({children}) => <strong className='text-primary'>{children}</strong> 

const Profile = compose(withFirebase, withAuthentication)(ProfileBase);

export default Profile;