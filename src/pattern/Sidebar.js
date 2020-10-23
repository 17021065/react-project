import React from 'react';
import { Nav } from 'react-bootstrap';
import pencil from '../img/pencil-logo.svg';
import home from '../img/home-logo.svg';
import search from '../img/white-search-logo.svg';

const Sidebar = ({elementStyle}) => {
  return <>
    {/* <div className='ml-sm-3 mb-sm-2'>
      <form className="form-inline" onSubmit={handleSearchSubmit}>
        <input type='text' className='form-control w-100' placeholder='Search...'></input>
      </form>
    </div> */}
    <Nav defaultActiveKey="/home" className="flex-column text-left" style={{fontSize: 20}}>
      <Nav.Link className={elementStyle} href='/'><img src={home} alt='Home Icon'></img>&ensp;Home</Nav.Link>
      <Nav.Link className={elementStyle} href='/search'><img src={search} alt='Search Icon'></img>&ensp;Search</Nav.Link>
      <Nav.Link className={elementStyle} href='/write'><img src={pencil} alt='Pencil Icon'></img>&ensp;Write</Nav.Link>
    </Nav>
  </>
}

export default Sidebar;