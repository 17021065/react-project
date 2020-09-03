import React from 'react';

const useSemiPersistentState = function(key, initialState){
    const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
  
    React.useEffect(function(){
      localStorage.setItem(key, value);
    }, [key, value]);
  
    return [value, setValue];
};

export default useSemiPersistentState;