import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from '../img/react-logo.jpg';
import bootstrapLogo from '../img/bootstrap-logo.png';
import ckeditorLogo from '../img/ckeditor-logo.png';
import firebaseLogo from '../img/logo-built_white.png';

const Footer = () => {
    return <div>
    <footer className='footer pt-sm-2 mr-sm-3 bg-white border-top'>
      <div className='container-fluid row pt-sm-3'>
        <div className='col-sm-4 text-sm-left'>
          <p><strong>Contract me:</strong></p>
          <p>
            <a href='https://www.facebook.com/profile.php?id=100013139312422'>Facebook</a>
            <br></br>
            Gmail: sieogiti7272@gmail.com
            <br></br>
            Phone: 0988381615
          </p>
        </div>
        <div className='col-sm-8 text-sm-right'>
          <div style={{paddingRight: 290}}><p><strong>Sponsored by:</strong></p></div>
          <div className='float-sm-right'>
          <img className={logoStyle} src={reactLogo} alt='React Logo' style={{height: 80, width:160}}></img>
          <img className={logoStyle} src={bootstrapLogo} alt='Bootstrap Logo' style={{height: 80, width:160}}></img>
          <img className={logoStyle} src={firebaseLogo} alt='Firebase Logo' style={{height: 80, width:160}}></img>
          <img className={logoStyle} src={ckeditorLogo} alt='Ckeditor Logo' style={{height: 80, width:160}}></img>
          </div>
        </div>
      </div>
    </footer>
    </div>     
}

const logoStyle = 'border border-black shadow-lg ml-3'

export default Footer;