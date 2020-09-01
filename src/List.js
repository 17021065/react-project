import React from 'react';

const List = function ({content, onRemoveItem}){
    return <div>
      {content.map(item => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>)}
    </div>
  }
  
const Item = function ({item, onRemoveItem}){
    return <div>
        <span><a href={item.url}>{item.title}</a> | </span>
        <span>{item.author} | </span>
        <span>{item.num_comments} | </span>
        <span>{item.points} | </span>
        &nbsp;&nbsp;
        <span><button type='button' onClick={() => onRemoveItem(item)}>Dismiss</button></span>
    </div>
}

export default List; 