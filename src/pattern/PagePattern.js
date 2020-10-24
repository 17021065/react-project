import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

const PagePattern = ({children}) =>(
  <>
  <div className='container-fluid bg-white pt-4' style={{minHeight: 1000}}>
    {children}
  </div>
  
  <Footer/>
  </>
)

export default PagePattern;