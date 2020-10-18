import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormControl,Button,Spinner, Pagination, } from 'react-bootstrap';
import search from '../img/search-24px.svg';
import List from './List';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import { compose } from 'recompose';
import { withFirebase } from '../controller/firebase';


const solveData = (database, subject) => {
  let raw = database.filter((item) =>
    item.subject.toLocaleLowerCase().includes(subject.toLocaleLowerCase())
  );
  let processed = [];
  for(let n=0; n<raw.length; n+=5){
    if(n+5>raw.length){
      processed.push(raw.slice(n, raw.length));
    }else{
      processed.push(raw.slice(n, n+5));
    }
  }
  return [raw, processed];
}

const SearcherBase = ({match, firebase}) => {

// *** STATE ***
  const [searchTerm, setSearchTerm] = React.useState('');

  const [active, setActive] = React.useState(1);

  const [rawList, setRawList] = React.useState([]);

  const [processedList, setProcessedList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

// *** HANDLER ***
  // *** SEARCH BAR ***
  React.useEffect(() => {
    setSearchTerm(match.params.subject);
    setIsLoading(true);
    setIsError(false);
    firebase.articles().once('value', snapshot => {
      const articlesObject = snapshot.val();
      const articlesList = Object.keys(articlesObject).map(key => ({
        ...articlesObject[key],
        aid: key,
      }));
      const [raw, processed] = solveData(articlesList, match.params.subject);
      setRawList(raw);
      setProcessedList(processed);
    })
    .then(() =>  setIsLoading(false))
    .catch(err => {
      console.log(err);
      setIsError(true);
    });
  }, [match, firebase]);

  const handleSearchInput = (event) => setSearchTerm(event.target.value);
  
  const handleSearchSubmit = (event) => {   
    window.location.replace(`/search/${searchTerm}`);
    event.preventDefault();
  }

  // *** RESULT ***
  const handlePagination = (event) =>{
    setActive(event.target.innerHTML*1);
  }

  let items = [];
  for (let number = 1; number <= processedList.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={handlePagination}>
        {number}
      </Pagination.Item>,
    );
  }

// *** RENDER ***
  return <>
    <PagePattern>
      <div className='mx-auto' style={{width: 400}}>
        <Form inline onSubmit={handleSearchSubmit}>
          <FormControl value={searchTerm} placeholder="Search" className="mr-sm-2 mx-4 w-75" onChange={handleSearchInput}/>
          <Button type="submit" variant="outline-secondary" disabled={!searchTerm}>
            <img src={search} alt='searchIcon'></img>
          </Button>
        </Form>  
      </div>
      <div className='mx-auto w-75 my-4'>
        {isError ? (
          <p>Something went wrong ...</p>
        ):(
          isLoading ? (
            <Spinner animation="border" />
          ):(
            <>
              <List content={processedList[active-1]} subject={match.params.subject} amount={rawList.length}/>
              <div className='mx-auto mt-4'>
                <Pagination>{items}</Pagination>
              </div>
            </>
          )
        )}   
      </div>
    </PagePattern>

    <Footer/>
  </>
}

const Searcher = compose(withFirebase)(SearcherBase)

export default Searcher;