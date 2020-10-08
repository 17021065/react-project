import React from 'react';
import '../sign/node_modules/bootstrap/dist/css/bootstrap.min.css';

const LoginPattern = ({children}) => (
  <div className='container-fluid bg-secondary py-4'>
    <div className='shadow-lg container py-4 bg-light' style={{width: 500}}>
      {children}
    </div>
  </div>
)

export default LoginPattern;