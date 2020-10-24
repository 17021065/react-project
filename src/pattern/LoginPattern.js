import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

const LoginPattern = ({children}) => (
  <>
  <div className='container-fluid bg-white' style={{minHeight: 800}}>
    <div className='container py-sm-4 bg-white float-sm-left' style={{width: 600}}>
      {children}
    </div>
  </div>
  
  <Footer/>
  </>
)

export default LoginPattern;