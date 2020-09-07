import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container } from 'react-bootstrap';

const Banner = () => {
    return <>
        <Jumbotron fluid style={{height: 845}}>
        <Container className='my-auto' style={{height: 700}}>
            <h1 style={{height:350, fontSize:80, paddingTop:250}}>Welcome to Library!</h1>
            <p style={{fontSize:30}}>Share you knowledge.</p>
        </Container>
        </Jumbotron>
    </>
}

export default Banner;