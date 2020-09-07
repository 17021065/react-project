import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import useSemiPersistentState from '../Controller/State'

const databaseReducer = (state, action) => {
    switch(action.type){
        case 'ARTICLE_SUBMIT_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'ARTICLE_SUBMIT_SUCCESS':
            return{
                ...state,
                isLoading: false,
                date: action.payload.date,
                subject: action.payload.subject,
                content: action.payload.content,
            };
        case 'ARTICLE_SUBMIT_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            };
        default: 
            throw new Error('Something strange happened #eofdtt02');
    }
}

const WriteUI = () => {

    const [date, setDate] = useSemiPersistentState('date', new Date());

    const [subject, setSubject] = useSemiPersistentState('subject', '');

    const [content, setContent] = useSemiPersistentState('content', '');

    const [database, dispatchDatabase] = React.useReducer(
        databaseReducer,
        {data: [], isLoading: false, isError: false}
    );
     
    const handleSubjectChange = (event) => setSubject(event.target.value);

    const handleContentChange = (event, editor) => setContent(editor.getData());

    const handleArticleSubmit = (event) => {
        setDate(new Date());
        event.preventDefault();
    } 

    const handleArticleSave =  React.useCallback(() => {
        
        console.log(subject);
        console.log(content);
        console.log(date);
    }, [date]);
    
    React.useEffect(() => {
        handleArticleSave();
    }, [handleArticleSave]);

    return (
    <>  
        <div className='container-fluid py-4 bg-secondary'>
            <div className='shadow container py-3 bg-light '>
                <h1>Write new article</h1>
                <form className='was-validated'>
                    <div className="form-group" onSubmit={handleArticleSubmit}>
                        <input type="text" className="form-control" placeholder="Subject" onChange={handleSubjectChange} required></input>
                        <div className='invalid-feedback'>Please fill out this field.</div>
                    </div>
                    <div className="form-group">
                        <CKEditor editor={ClassicEditor} onChange={handleContentChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>  
        </div>
        <div className='container'>
            {database.isError && <p>Something went wrong...</p>}

            {database.isLoading ? (
                <Spinner animation="border" />
            ) : (
                <div>
                <span>{database.subject}</span>
                <span>{database.content}</span>
                <span>{database.date}</span>
                </div>    
            )}
        </div>
        <div className='container-fluid'>
            <h1>Footer</h1>
        </div>     
    </>
    )
}

export default WriteUI;