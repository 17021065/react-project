import React from 'react';
import InputWithID from './InputWithID.js'

const SearchForm = ({id, value, onSearch, onSubmit}) => (
    <>
        <form onSubmit={onSubmit}>
        <InputWithID id={id} value={value} onSearch={onSearch} isFocused>
            <strong>Search:</strong>
        </InputWithID>
        &nbsp;&nbsp;
        <button type='submit' disabled={!value}>Submit</button>
        </form>
    </>
)

export default SearchForm;