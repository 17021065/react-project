import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Modal, Button } from 'react-bootstrap';
import useSemiPersistentState from '../controller/State'
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';

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
// Start declare state
  const [date, setDate] = React.useState(new Date());

  const [articleSubject, setArticleSubject] = useSemiPersistentState('subject', '');

  const [articleContent, setArticleContent] = useSemiPersistentState('content', '');

  const [cancelState, setCancelState] = React.useState(false);

  const [showCancelPrompt, setShowCancelPrompt] = React.useState(false);
// End declare state

// Start handle state
  const handleSubjectChange = (event) => setArticleSubject(event.target.value);

  const handleContentChange = (event, editor) => setArticleContent(editor.getData());
  
  const handleCloseCancelPrompt = () => setShowCancelPrompt(false);

  const handleShowCancelPrompt = () => setShowCancelPrompt(true);

  const handleCancelWriting = (event) => {
    setCancelState(true);
    setArticleSubject('');
    setArticleContent('');
  }

  const handleArticleSubmit = (event) => {
    setDate(new Date());
    event.preventDefault();
  } 

  const handleArticleSave =  React.useCallback(() => {
    
    console.log(articleSubject);
    console.log(articleContent);
    console.log(date);
  }, [date]);
    
  React.useEffect(() => {
    handleArticleSave();
  }, [handleArticleSave]);

  React.useEffect(() => {
    $('#subject').html(articleSubject);
    $('#content').html(articleContent);
  }, [articleContent, articleSubject]);

  window.addEventListener('beforeunload', (e) =>{
    window.confirm('Leave ?');
  });
// End handle state

  return <>
    <PagePattern>
      <Tabs defaultActiveKey="writing" transition={false} id="noanim-tab-example">
        <Tab eventKey="writing" title="Writing Page" className='mx-3 mt-2'>
          <h1>Write new article</h1>
            <form className='was-validated' onSubmit={handleArticleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Subject" value={articleSubject} onChange={handleSubjectChange} required></input>
                <div className='invalid-feedback'>Please fill out this field.</div>
              </div>
              <div className="form-group">
                <CKEditor 
                  editor={ClassicEditor}
                  data={articleContent} 
                  onChange={handleContentChange}
                />
              </div>
              <div className='form-group'>
                <button type="submit" className="btn btn-success mx-sm-2" style={{width:80}}>Submit</button>
                <button type='button' className="btn btn-danger mx-sm-2" style={{width:80}} onClick={handleShowCancelPrompt}>Cancel</button>
              </div>
            </form>
        </Tab>
        <Tab eventKey="preview" title="Preview Article">
          <div className='text-left m-5'> 
            <h1 id='subject'>Subject</h1>
            <hr></hr>
            <br></br>
            <p id='content'></p>
          </div>
        </Tab>
      </Tabs>           
    </PagePattern>
    {cancelState === true && <Redirect to='/'></Redirect>}
    <Modal show={showCancelPrompt} animation={false} onHide={handleCloseCancelPrompt}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Everything written will be delete and you will move to homepage. Do you still want to leave ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancelPrompt}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCancelWriting}>
            Leave
          </Button>
        </Modal.Footer>
    </Modal>
    <Footer/>    
  </>
}

export default WriteUI;