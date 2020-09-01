import React from 'react';
import './App.css';
import SearchForm from './SearchForm.js';
import List from './List.js'

// Start state controller define
const useSemiPersistentState = function(key, initialState){
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(function(){
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

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

function App() {

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

/* 
// Start manage search bar checker state
  const [checkTerm, setCheckTerm] = useSemiPersistentState('checker', 'focus')

  const handleCheck = function(event){
    setCheckTerm(event.target.value);
    console.log(checkTerm);
  }
// End manage search bar checker state
*/

  return (
    <div className="App">

      <h1>Hacker Stories</h1>

      <SearchForm id={'search'} value={searchTerm} onSearch={handleSearchInput} onSubmit={handleSearchSubmit} />
      <br></br>
      <p>Searching for <strong>{searchTerm}</strong></p> 

      {/*<InputWithID id={'checker'} value={checkTerm} onSearch={handleCheck}>
        <strong>Checker:</strong>
      </InputWithID>*/}
      
      <br></br>
      {hackerList.isError && <p>Something went wrong ...</p>}

      {hackerList.isLoading ? (<p>Loading...</p>) : (<List content={hackerList.data} onRemoveItem={handleRemoveItem}/>) }
    </div>
  );
}

export default App;
