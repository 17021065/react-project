import React from 'react';
import '../sign/node_modules/bootstrap/dist/css/bootstrap.min.css';

const PagePattern = ({children}) =>(
  <div className='container-fluid bg-secondary py-4'>
    <div className='shadow-lg container py-4 bg-light'>
      {children}
    </div>
  </div>
)

export default PagePattern;