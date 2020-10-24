import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container,} from 'react-bootstrap';
import search from '../img/search-24px.svg';
import PagePattern from '../pattern/PagePattern';

const SearchBanner = () => {
// *** STATE ***
  const [searchTerm, setSearchTerm] = React.useState(undefined);

// *** HANDLER ***
  const handleSearchInput = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = (event) => {
    window.location.replace(`/search/${searchTerm}`);
    event.preventDefault();
  }

// *** RENDER ***
  return <>
  <PagePattern>
    <Jumbotron fluid style={{height: 845}} className='bg-white'>
      <Container className='my-auto' style={{height: 700}}>
        <h1 style={{height:350, fontSize:80, paddingTop:220, fontFamily: "Georgia"}}>
          Searching with Library
        </h1>
        <div className='mx-auto'style={{width: 648}}>
          <form className="form-inline" onSubmit={handleSearchSubmit}>  
            <input type="text" className="form-control shadow" style={{width: 600, marginLeft: 24}} placeholder='Type a subject' onChange={handleSearchInput}></input>
            <img src={search} alt='search icon' style={{position: "relative", right: 30}}></img>
          </form>
        </div>
      </Container>
    </Jumbotron>
    
  </PagePattern>
  </>
}

export default SearchBanner;