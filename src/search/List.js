import React from 'react';
import { Alert } from 'react-bootstrap';
import { compose } from 'recompose';
import { withFirebase } from '../controller/firebase';

const List = function ({content, subject, amount}){
  if(content){
    return <div style={{minHeight: 890}}>
      <p className='text-left' style={{fontSize: 25}}>
        {amount} results were found for <strong className='text-primary'>"{subject}"</strong>
      </p>
      <hr></hr>
      {content.map(item => <Item key={item.aid} item={item}/>)}
    </div>
  }else{
    return <div className='container-fluid' style={{minHeight: 890}}>
    <hr></hr>
      <Alert variant='warning text-left'>
        No results were found!
      </Alert>
    </div>;
  }
}
  
const ItemBase = function ({item, firebase}){
  const handleClick = event => {
    firebase.article(item.aid).once('value', snapshot => {
      const article = snapshot.val();
      const newView = article.view+1;
      firebase.article(item.aid).set({
        ...article,
        view: newView,
      })
    })
    .then(() => window.location.replace(`/article/${item.aid}`))
    .catch(err => {
      console.log(err);
      event.preventDefault();
    })
    event.preventDefault();
  }
  
  return <>
    <div className="card border-0">
      <div className="card-body">
        <a href={`/article/${item.aid}`} className='float-left' style={{fontSize: 25}} onClick={handleClick}>{item.subject}</a>
        <br></br>
        <p className="card-text text-left mt-sm-4">
          <strong>Author:</strong> {item.author}<br></br>
          {item.date}
        </p>
      </div>
    </div>
  </>
}
const Item = compose(withFirebase)(ItemBase);

export default List; 