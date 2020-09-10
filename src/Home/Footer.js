import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from '../img/react-logo.jpg';
import bootstrapLogo from '../img/bootstrap-logo.png';
import ckeditorLogo from '../img/ckeditor-logo.png';

const Footer = () => {
    return <div>
    <footer className='footer pt-4 bg-light'>
      <div className='container-fluid row pt-3'>
        <div className='col-sm-4 text-sm-left'>
          <p style={{marginLeft: 30}}><strong>Contract me:</strong></p>
          <p style={{marginLeft: 30}}>
            <a href='https://www.facebook.com/profile.php?id=100013139312422'>Facebook</a>
            <br></br>
            Gmail: sieogiti7272@gmail.com
            <br></br>
            Phone: 0988381615
          </p>
        </div>
        <div className='col-sm-8 text-sm-right'>
          <div style={{paddingRight: 220}}><p><strong>Sponsored by:</strong></p></div>
          <div className='float-sm-right'>
          <img className='border border-black shadow-lg mr-3' src={reactLogo} alt='React Logo' style={{height: 80, width:160}}></img>
          <img className='border border-black shadow-lg mx-3' src={bootstrapLogo} alt='Bootstrap Logo' style={{height: 80, width:160}}></img>
          <img className='border border-black shadow-lg ml-3' src={ckeditorLogo} alt='Ckeditor Logo' style={{height: 80, width:160}}></img>
          </div>
        </div>
      </div>
    </footer>
    </div>     
}

export default Footer;