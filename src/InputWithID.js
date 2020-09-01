import React from 'react';

const InputWithID = ({id , type='text', value, onSearch, isFocused, children}) => {
    const inputRef = React.useRef();
  
    React.useEffect(() => {
      if(isFocused){
        inputRef.current.focus();
      }
    }, [isFocused]);
  
    return <>
      <label htmlFor={id}>{children}</label>
      &nbsp;&nbsp;
        <input ref={inputRef} id={id} type={type} value={value} onChange={onSearch} /*autoFocus={isFocused}*/></input>
    </>
  }

export default InputWithID;