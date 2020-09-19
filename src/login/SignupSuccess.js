import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const SignupSuccess = () => {
    const [redirect, setRedirect] = React.useState(false);

    setTimeout(() => {
        setRedirect(true);
    }, 2000);

    return <>
        <Jumbotron fluid style={{height: 845}}>
        <Container className='my-auto' style={{height: 700}}>
            <h1 style={{height:350, fontSize:80, paddingTop:250}}>Signed up successfully!</h1>
            <p style={{fontSize:30}}>You will be redirect to login page after seconds.</p>
            <Spinner animation="border" />
        </Container>
        </Jumbotron>
        {redirect && <Redirect to='/login'></Redirect>}
    </>
}

export default SignupSuccess;