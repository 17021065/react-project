import React from 'react';
import { Alert } from 'react-bootstrap';

const List = function ({content, subject, amount}){
  if(content){
    return <div>
      <p className='text-left' style={{fontSize: 25}}>
        {amount} results were found for <strong className='text-primary'>"{subject}"</strong>
      </p>
      <hr></hr>
      {content.map(item => <Item key={item.articleID} item={item}/>)}
    </div>
  }else{
    return <div className='container-fluid' style={{height: 476}}>
    <hr></hr>
      <Alert variant='warning text-left'>
        No results were found!
      </Alert>
    </div>;
  }
}
  
const Item = function ({item}){
    return <div>
            <div className="card my-2">
              <div className="card-body">
              <h4 className="card-title text-left">{item.subject}</h4>
                <p className="card-text text-left">{item.content}</p>
                <a href="#" className="card-link float-left">See more</a>
              </div>
            </div>
          </div>
}

export default List; 