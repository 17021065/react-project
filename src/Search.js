import React from 'react';
import List from './List.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,FormControl,Button,Spinner } from 'react-bootstrap';
import search from './search-24px.svg';
import useSemiPersistentState from './StateController'

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
      throw new Error('Something strange happened #eofdtt03');
  }
}
// End state controller define

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const SearchUI = () => {
// Start declare state
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'react');

/*   const [hackerList, dispatchHackerList] = React.useReducer(
    hackerListReducer,
    {data: [], isLoading: false, isError: false} 
  ); */

  const [articleList, dispatchArticleList] = React.useReducer(
    articleListReducer,
    {data: [], isLoading: false, isError: false} 
  );

  /* const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`); */

  const [subject, setSubject] = React.useState('');
// End declare state 

// Start manage list state
/*   const handleFetchStories =  React.useCallback(async () => {
    dispatchHackerList({type: 'LISTS_FETCH_INIT'});
    try{
      const result = await (await fetch(url)).json();
      dispatchHackerList({type: 'LISTS_FETCH_SUCCESS', payload: result.hits});
    }catch{
      dispatchHackerList({type: 'LISTS_FETCH_FAILURE'});
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]); */

  const handleFetchArticles =  React.useCallback(async () => {
    dispatchArticleList({type: 'LISTS_FETCH_INIT'});
    try{
      const result = await (
        await fetch('/article', { 
          method: 'POST',
          data: subject,
        })
      ).json();
      dispatchArticleList({type: 'LISTS_FETCH_SUCCESS', payload: result.hits});
    }catch{
      dispatchArticleList({type: 'LISTS_FETCH_FAILURE'});
    }
  }, [subject]);

  React.useEffect(() => {
    handleFetchArticles();
  }, [handleFetchArticles]);

 /*  const handleRemoveItem = item =>{
    dispatchHackerList({type: 'REMOVE_ITEM', payload: item,});
  } */
// End manage list state

// Start manage search bar state 
  const handleSearchInput = (event) => setSearchTerm(event.target.value);

/*   const handleSearchSubmit = (event) =>{
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  } */
  
  const handleSearchSubmit2 = (event) => {
    setSubject(searchTerm.toLowerCase());
    event.preventDefault();
  }
// End manage search bar state
    return <>
      <div className='container-fluid bg-secondary py-4'>
        <div className='shadow container py-4 bg-light'>
          <div className='mx-auto' style={{width: 400}}>
            <Form inline onSubmit={handleSearchSubmit2}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2 mx-4 w-75" onChange={handleSearchInput}/>
                <Button type="submit" variant="outline-secondary" disabled={!searchTerm}>
                  <img src={search} alt='searchIcon'></img>
                </Button>
            </Form>  
          </div>
          <div className='mx-auto w-75 my-4' style={{height: 700}}>
            <p className='py-3'>Results for <strong>{searchTerm}</strong></p>

            {articleList.isError && <p>Something went wrong ...</p>}

            {articleList.isLoading ? (
              <Spinner animation="border" />
            ) : (
              <div>
                <p>{articleList.data}</p>
                <div class="card">
                  <div class="card-body">
                  <h4 class="card-title text-left">Card title</h4>
                    <p class="card-text text-left">Some example text. Some example text.</p>
                    <a href="#" class="card-link float-left">Card link</a>
                  </div>
                </div>
              </div>
            )}
            {/* <List content={hackerList.data} onRemoveItem={handleRemoveItem} /> */}
          </div>
        </div>
      </div>
      <div className='container-fluid'>
            <h1>Footer</h1>
      </div>     
    </>
}

export default SearchUI;