import React from 'react';
import { Nav } from 'react-bootstrap';
import pencil from '../img/pencil-logo.svg';
import home from '../img/home-logo.svg';
import search from '../img/white-search-logo.svg';

const Sidebar = () => {
  return <>
    <Nav defaultActiveKey="/home" justify={true} className="flex-column text-left" style={{fontSize: 20}}>
      <Nav.Link className={style} href='/'><img src={home} alt='Home Icon'></img>&ensp;Home</Nav.Link>
      <Nav.Link className={style} href='/search'><img src={search} alt='Search Icon'></img>&ensp;Search</Nav.Link>
      <Nav.Link className={style} href='/write'><img src={pencil} alt='Pencil Icon'></img>&ensp;Write</Nav.Link>
    </Nav>
  </>
}

const style = 'text-white text-left my-sm-2 ml-sm-1 border rounded'

export default Sidebar;