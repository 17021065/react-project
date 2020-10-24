import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container, Spinner } from 'react-bootstrap';
import PagePattern from '../pattern/PagePattern';

const SignupSuccess = () => {
  setTimeout(() => {
    window.location.replace('/');
  }, 2000);

  return <>
    <PagePattern>
      <Jumbotron fluid style={{height: 845}} className='bg-white'>
        <Container style={{height: 700}}>
          <h1 style={{height:350, fontSize:80, paddingTop:250}}>Signed up successfully!</h1>
          <p style={{fontSize:30}}>You will be redirect to login page after seconds.</p>
          <Spinner animation="border" />
        </Container>
      </Jumbotron>
    </PagePattern>
  </>
}

export default SignupSuccess;