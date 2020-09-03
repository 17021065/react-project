import React from 'react';
import InputWithID from './InputWithID.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchForm = ({id, className, value, onSearch, onSubmit, placeHolder, buttonVariant}) => (
    <>
        <form onSubmit={onSubmit} inline>
        <InputWithID id={id} className={className} onSearch={onSearch} placeHolder={placeHolder}></InputWithID>
        &nbsp;&nbsp;
        <button type='submit' variant={buttonVariant} disabled={!value}>Submit</button>
        </form>
    </>
)

export default SearchForm;