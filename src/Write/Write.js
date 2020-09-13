import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import useSemiPersistentState from '../controller/State'
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';

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

  const [date, setDate] = React.useState(new Date());

  const [subject, setSubject] = useSemiPersistentState('subject', '');

  const [content, setContent] = useSemiPersistentState('content', '');
     
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

  return <>  
    <PagePattern>
      <Tabs defaultActiveKey="writing" transition={false} id="noanim-tab-example">
        <Tab eventKey="writing" title="Writing Page" className='mx-3 mt-2'>
          <h1>Write new article</h1>
            <form className='was-validated' onSubmit={handleArticleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Subject" onChange={handleSubjectChange} required></input>
                <div className='invalid-feedback'>Please fill out this field.</div>
              </div>
              <div className="form-group">
                <CKEditor editor={ClassicEditor} onChange={handleContentChange}/>
              </div>
              <div className='form-group'>
                <button type="submit" className="btn btn-success mx-sm-2" style={{width:80}}>Submit</button>
                <button type='button' className="btn btn-danger mx-sm-2" style={{width:80}}>Cancel</button>
              </div>
            </form>
        </Tab>
        <Tab eventKey="preview" title="Preview Article">
          <div className='text-left m-5'> 
            <h1>{subject}</h1>
            <hr></hr>
            <br></br>
            <p>{content}</p>
          </div>
        </Tab>
      </Tabs>           
    </PagePattern>

    <Footer/>    
  </>
}

export default WriteUI;