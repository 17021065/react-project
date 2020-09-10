import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,FormControl,Button,Spinner, Pagination, } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import search from '../img/search-24px.svg';
import useSemiPersistentState from '../Controller/State'
import List from './List';
import Footer from '../Home/Footer'

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
  {
    articleID: 7,
    subject: 'Dog',
    content: 'Pitbull, Corgi, Becgie'
  },
  {
    articleID: 8,
    subject: 'Music',
    content: 'rock, pop, ballad'
  },
  {
    articleID: 9,
    subject: 'Celebrity',
    content: 'singer, actor, actress'
  },
  {
    articleID: 10,
    subject: 'Language',
    content: 'English-UK, France, English-US, Chinese, Japanese, Vietnamese, Korean'
  },
  {
    articleID: 11,
    subject: 'Large Cat',
    content: 'Jaguar, Leopard, Black Panther, White Panther, Cougar'
  },
  {
    articleID: 12,
    subject: 'Mammal',
    content: 'Human, Elephant, Bat, Whale'
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
  const [searchTerm, setSearchTerm] = React.useState(undefined);

  const [active, setActive] = useSemiPersistentState('page', 1);

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
// End manage search bar state

// Start manage list state
  const handlePagination = (event) =>{
    setActive(event.target.innerHTML*1);
  }

  let items = [];
  for (let number = 1; number <= result.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={handlePagination}>
        {number}
      </Pagination.Item>,
    );
  }
// End manage list state

  return <>
    <div className='container-fluid bg-secondary py-4'>
      <div className='shadow-lg container py-4 bg-light'>
        <div className='mx-auto' style={{width: 400}}>
          <Form inline onSubmit={handleSearchSubmit}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2 mx-4 w-75" onChange={handleSearchInput}/>
              <Button type="submit" variant="outline-secondary" disabled={!searchTerm}>
                <img src={search} alt='searchIcon'></img>
              </Button>
          </Form>  
        </div>
        <div className='mx-auto w-75 my-4'>
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
          {subject==='' ? (
            <p className='text-black-50' style={{height: 500, fontSize: 30, paddingTop: 200}}>
              Type a subject into search bar to find related articles
            </p>
          ) : (
            <div>
              <List content={result[active-1]} subject={subject} amount={_result.length}/>
              <div className='mx-auto mt-4'>
                <Pagination>{items}</Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    <Footer/>
  </>
}

export default SearchUI;