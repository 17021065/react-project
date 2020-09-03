import React from 'react';
import List from './List.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,FormControl,Button,Spinner } from 'react-bootstrap';
import search from './search-24px.svg';
import useSemiPersistentState from './StateController'

// Start state controller define
const hackerListReducer = (state, action) => {
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
};
// End state controller define

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const SearchUI = () => {
// Start declare state
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'react');

  const [hackerList, dispatchHackerList] = React.useReducer(
    hackerListReducer,
    {data: [], isLoading: false, isError: false} 
  );

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);
// End declare state 

// Start manage list state
  const handleFetchStories =  React.useCallback(async () => {
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
  }, [handleFetchStories]);

  const handleRemoveItem = item =>{
    dispatchHackerList({type: 'REMOVE_ITEM', payload: item,});
  }
// End manage list state

// Start manage search bar state 
  const handleSearchInput = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = (event) =>{
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  }  
// End manage search bar state
    return <>
      <Navbar bg="light" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"/>
          <Form inline onSubmit={handleSearchSubmit}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleSearchInput}/>
            <Button type="submit" variant="outline-success" disabled={!searchTerm}>
              <img src={search} alt='searchIcon'></img>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br></br>
      <p>Searching for <strong>{searchTerm}</strong></p>

      {hackerList.isError && <p>Something went wrong ...</p>}

      {hackerList.isLoading ? (
        <Spinner animation="border" />
      ) : (
        <List content={hackerList.data} onRemoveItem={handleRemoveItem} />
      )}
      
    </>
  }

export default SearchUI;