import React from 'react';
import '../sign/node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form,FormControl,Button,Spinner, Pagination, } from 'react-bootstrap';
import search from '../img/search-24px.svg';
import List from './List';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import database from '../database';
import { Redirect } from 'react-router-dom';


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

const SearchUI = ({match}) => {
  
// Start declare state
  const [searchTerm, setSearchTerm] = React.useState('');

  const [active, setActive] = React.useState(1);

  const [subject, setSubject] = React.useState('');

  const [newSearch, setNewSearch] = React.useState(false);
// End declare state 

// Start manage search bar state
  React.useEffect(() => {
    if(match.params.subject){
      setSearchTerm(match.params.subject);
      setSubject(match.params.subject);
    }
  }, [match]);

  const handleSearchInput = (event) => setSearchTerm(event.target.value);
  
  const handleSearchSubmit = (event) => {   
    setNewSearch(true);
  }

  const [raw, processed] = solveData(database, subject);
// End manage search bar state

// Start manage list state
  const handlePagination = (event) =>{
    setActive(event.target.innerHTML*1);
  }

  let items = [];
  for (let number = 1; number <= processed.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={handlePagination}>
        {number}
      </Pagination.Item>,
    );
  }
// End manage list state

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
          {/* {articleList.isError && <p>Something went wrong ...</p>} */}

          {subject==='' ? (
            <p className='text-black-50' style={{height: 500, fontSize: 30, paddingTop: 200}}>
              Type a subject into search bar to find related articles
            </p>
          ) : (
            <div>
              <List content={processed[active-1]} subject={subject} amount={raw.length}/>
              <div className='mx-auto mt-4'>
                <Pagination>{items}</Pagination>
              </div>
            </div>
          )}
      </div>
    </PagePattern>
    {newSearch && <Redirect to={`/search/${searchTerm}`}></Redirect>}
    <Footer/>
  </>
}

export default SearchUI;