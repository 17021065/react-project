import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container } from 'react-bootstrap';
import PagePattern from './PagePattern';

const Banner = () => {
  return <>
  <PagePattern>
    <Jumbotron fluid style={{height: 845}} className='bg-white'>
      <Container  style={{height: 700}}>
        <h1 style={{height:350, fontSize:80, paddingTop:250}}>Welcome to Library!</h1>
        <p style={{fontSize:30}}>Share you knowledge.</p>
      </Container>
    </Jumbotron>
  </PagePattern>
  </>
}

export default Banner;