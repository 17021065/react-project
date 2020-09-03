import React from 'react';

const InputWithID = ({id , type='text', className, onSearch, placeHolder}) => {
    return <>
        <input id={id} className={className} type={type} placeholder={placeHolder} onChange={onSearch}></input>
    </>
  }

export default InputWithID;