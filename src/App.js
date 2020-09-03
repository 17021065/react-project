import React from 'react';
import './App.css';
import List from './List.js'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Spinner } from 'react-bootstrap';
import search from './search-24px.svg';

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

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Wiki App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
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

      <CKEditor 
        editor={ClassicEditor}
        onInit={ editor => {}}
      />
      
      <br></br>
      {hackerList.isError && <p>Something went wrong ...</p>}

      {hackerList.isLoading ? (<Spinner animation="border"/>) : (<List content={hackerList.data} onRemoveItem={handleRemoveItem}/>)}
    </div>
  );
}

export default App;
