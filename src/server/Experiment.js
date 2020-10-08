import React from 'react';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import {FirebaseContext} from '../controller/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Experiment = () => {

  return <> 
    <PagePattern>
      <div className='table-responsive'>
        <button type='button'>Show</button>
        <p id='demo'></p>
      </div>
      <FirebaseContext.Consumer>
        {firebase => {
          return <div>I've access to Firebase and render something.</div>;
        }}
      </FirebaseContext.Consumer>
    </PagePattern>

    <Footer/>
  </>
}

export default Experiment;