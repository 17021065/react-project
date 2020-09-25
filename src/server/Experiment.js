import React from 'react';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

const Experiment = () => {

  const fetch_data = () => {
    var str = 'helloworld';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        document.getElementById("demo").innerHTML = xhttp.responseText;
        console.log(xhttp.responseText);
      }
    };
    xhttp.open("GET", "exp.php?q="+str, true);
    xhttp.send();
  }

  return <> 
    <PagePattern>
      <div className='table-responsive'>
        <button type='button' onClick={fetch_data}>Show</button>
        <p id='demo'></p>
      </div>
    </PagePattern>

    <Footer/>
  </>
}

export default Experiment;