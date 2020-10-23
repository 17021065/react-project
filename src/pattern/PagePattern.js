import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PagePattern = ({children}) =>(
  <div className='container-fluid bg-white pt-4'>
    {children}
  </div>
)

export default PagePattern;