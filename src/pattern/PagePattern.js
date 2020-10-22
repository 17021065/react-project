import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PagePattern = ({children}) =>(
  <div className='container-fluid bg-light pt-4 border'>
    {children}
  </div>
)

export default PagePattern;