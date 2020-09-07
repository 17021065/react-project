import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormControl,Button,Spinner, Pagination,Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import search from '../img/search-24px.svg';
import useSemiPersistentState from '../Controller/State'
import List from './List';

const database = [
  {
    articleID: 1,
    subject: 'number',
    content: '0123456789'
  },
  {
    articleID: 2,
    subject: 'character',
    content: 'abcdefghiklmnopqrstuxyz'
  },
  {
    articleID: 3,
    subject: 'animal',
    content: 'dog, bear, chicken, bird, fish'
  },
  {
    articleID: 4,
    subject: 'chemistry',
    content: 'Carbon, Natri, Magie, Hidro'
  },
  {
    articleID: 5,
    subject: 'Color',
    content: 'Red, Black, Yellow, Gray, Blue'
  },
  {
    articleID: 6,
    subject: 'Size',
    content: 'small, medium, large'
  },
];

// Start state controller define
/* const hackerListReducer = (state, action) => {
  switch(action.type){
    case 'LISTS_FETCH_INIT':
      return {
        ...state, 
        isLoading: true, 
        isError: false,
      };
    case 'LISTS_FETCH_SUCCESS':
      return {
        ...state, 
        isLoading: false, 
        isError: false, 
        data: action.payload,
      };
    case 'LISTS_FETCH_FAILURE':
      return{
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_ITEM':
      return{
        ...state,
        data: state.data.filter(item => action.payload.objectID !== item.objectID),
      };
    default:
      throw new Error('Something strange happened #eofdtt01'); 
  }
}; */

const articleListReducer = (state, action) => {
  switch(action.type){
    case 'LISTS_FETCH_INIT':
      return {
        ...state, 
        isLoading: true, 
        isError: false,
      };
    case 'LISTS_FETCH_SUCCESS':
      return {
        ...state, 
        isLoading: false, 
        isError: false, 
        data: action.payload,
      };
    case 'LISTS_FETCH_FAILURE':
      return{
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error('Fetch data fail #Err01');
  }
}
// End state controller define

const SearchUI = () => {

// Start declare state
  const [searchTerm, setSearchTerm] = React.useState('');

/*   const [articleList, dispatchArticleList] = React.useReducer(
    articleListReducer,
    {data: [], isLoading: false, isError: false} 
  ); */

  const [subject, setSubject] = React.useState('');
// End declare state 
/* 
// Start manage list state
  const handleFetchArticles =  React.useCallback(() => {
    dispatchArticleList({type: 'LISTS_FETCH_INIT'});
    try{
      const result = await (
        await fetch('/search', { 
          method: 'POST',
          data: subject,
        })
      ).json();
      dispatchArticleList({type: 'LISTS_FETCH_SUCCESS', payload: database}); //result.hits
    }catch{
      dispatchArticleList({type: 'LISTS_FETCH_FAILURE'});
    }
  }, [subject]);

  React.useEffect(() => {
    handleFetchArticles();
  }, [handleFetchArticles]); 
// End manage list state
 */
// Start manage search bar state 
  const handleSearchInput = (event) => setSearchTerm(event.target.value);
  
  const handleSearchSubmit = (event) => {   
    setSubject(searchTerm);
    event.preventDefault();
  }

  const _result = database.filter((item) =>
    item.subject.toLocaleLowerCase().includes(subject.toLocaleLowerCase())
  );
  let result = [];
  for(let n=0; n<_result.length; n+=5){
    if(n+5>_result.length){
      result.push(_result.slice(n, _result.length));
    }else{
      result.push(_result.slice(n, n+5));
    }
  }
  for(let n=0; n<result.length; n++){
    console.log(result[n].length)
  }
// End manage search bar state
  const [active, setActive] = React.useState(1);

  const handlePagination = (number) =>{
    setActive(number); 
  }

  let items = [];
  for (let number = 1; number <= result.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} href={`/search/page${number}`}>
        {number}
      </Pagination.Item>,
    );
  }

  return <>
    <div className='container-fluid bg-secondary py-4'>
      <div className='shadow container py-4 bg-light'>
        <div className='mx-auto' style={{width: 400}}>
          <Form inline onSubmit={handleSearchSubmit}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2 mx-4 w-75" onChange={handleSearchInput}/>
              <Button type="submit" variant="outline-secondary" disabled={!searchTerm}>
                <img src={search} alt='searchIcon'></img>
              </Button>
          </Form>  
        </div>
        <div className='mx-auto w-75 my-4'style={{height: 850}}>
          <p className='py-3'>Results for <strong>{searchTerm}</strong></p>
{/* 
          {articleList.isError && <p>Something went wrong ...</p>}

          {articleList.isLoading ? (
            <Spinner animation="border" />
          ) : (
            <div>
              <p>{articleList.data}</p>
              <div className="card">
                <div className="card-body">
                <h4 className="card-title text-left">Card title</h4>
                  <p className="card-text text-left">Some example text. Some example text.</p>
                  <a href="#" className="card-link float-left">Card link</a>
                </div>
              </div>
            </div>
          )} */}

          {/* <List content={result}/> */}
          
        </div>
        <div className='mx-auto w-75'>
          <Pagination>{items}</Pagination>
        </div>
      </div>
    </div>
    
    <div className='container-fluid'>
          <h1>Footer</h1>
    </div>     
  </>
}

export default SearchUI;