import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container,} from 'react-bootstrap';
import search from '../img/search-24px.svg';
import article from '../img/article-24px.svg';
import Footer from '../pattern/Footer';

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
    <Jumbotron fluid style={{height: 845}} className='bg-light border'>
      <Container className='my-auto' style={{height: 700}}>
        <h1 style={{height:350, fontSize:200, paddingTop:80, fontFamily: "Georgia"}}>
          <img src={article} alt='article icon' style={{width: 200, height:200}}></img>Library
        </h1>
        <div className='mx-auto'style={{width: 648}}>
          <form className="form-inline" onSubmit={handleSearchSubmit}>  
            <input type="text" className="form-control shadow" style={{width: 600, marginLeft: 24}} placeholder='Find a article' onChange={handleSearchInput}></input>
            <img src={search} alt='search icon' style={{position: "relative", right: 30}}></img>
          </form>
        </div>
      </Container>
    </Jumbotron>
    <Footer/>
  </>
}

export default SearchBanner;