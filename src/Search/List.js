import React from 'react';

const List = function ({content}){
    return <div>
      {content.map(item => <Item key={item.articleID} item={item}/>)}
    </div>
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