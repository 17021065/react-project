import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { compose } from 'recompose';
import { Tabs, Tab, Modal, Button, Alert } from 'react-bootstrap';
import useSemiPersistentState from '../controller/state/State'
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import $ from 'jquery';
import { withAuthentication} from '../controller/session';
import { withFirebase } from '../controller/firebase';

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

const WriteFormBase = ({match, authUser, firebase}) => {
// *** STATE ***
  const [subject, setSubject] = useSemiPersistentState('subject', '');

  const [content, setContent] = useSemiPersistentState('content', '');

  const [author, setAuthor] = React.useState();

  const [showPrompt, setShowPrompt] = React.useState(false);

// *** HANDLER ***
  React.useEffect(() => {
    !!authUser && firebase.user(authUser.uid).on('value', snapshot => {
      const currentUser = snapshot.val();
      !!currentUser && setAuthor(currentUser.username);
    });
  }, [authUser, firebase]);

  React.useEffect(() => {
    if(match.params.id){
      firebase.article(match.params.id).once('value', snapshot => {
        const article = snapshot.val();
        setSubject(article.subject);
        setContent(article.content);
      });
    }
  }, [match, setSubject, setContent, firebase]);
  
  const handleInitCkeditor = (editor) => editor.setData(content);

  const handleSubjectChange = (event) => setSubject(event.target.value);

  const handleContentChange = (event, editor) => setContent(editor.getData());
  
  const handleClosePrompt = () => setShowPrompt(false);

  const handleShowPrompt = () => setShowPrompt(true);

  const handleCancel = (event) => {
    setSubject('');
    setContent('');
    window.location.reload();
  }

  const handleSubmit = (event) => {
    firebase.articles().push({
      subject: subject,
      content: content,
      author: author,
      date: new Date().toString(),
    })
    setSubject('');
    setContent('');
    window.location.reload();
    event.preventDefault();
  } 

  $('#subject').html(subject);
  $('#content').html(content);

// *** RENDER ***
  return <>
    <PagePattern>
      <Tabs defaultActiveKey="writing" transition={false} id="noanim-tab-example">
        <Tab eventKey="writing" title="Writing Page" className='mx-3 mt-2'>
          {!authUser && <Alert variant='warning'>You have to sign in to submit article!</Alert>}
          <h1>Write new article</h1>
            <form className='was-validated' onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Subject" value={subject} onChange={handleSubjectChange} required></input>
                <div className='invalid-feedback'>Please fill out this field.</div>
              </div>
              <div className="form-group">
                <CKEditor 
                  editor={ClassicEditor} 
                  data={content}
                  onChange={handleContentChange}
                  onInit={handleInitCkeditor}
                />
              </div>
              <div className='form-group'>
                <button type="submit" className="btn btn-success mx-sm-2" style={{width:80}}>Submit</button>
                <button type='button' className="btn btn-danger mx-sm-2" style={{width:80}} onClick={handleShowPrompt}>Cancel</button>
              </div>
            </form>
        </Tab>
        <Tab eventKey="preview" title="Preview Article">
          <div className='text-left m-5'> 
            <h1 className='display-4' id='subject'>@subject</h1>
            <hr></hr>
            <br></br>
            <p id='content'></p>
          </div>
        </Tab>
      </Tabs>           
    </PagePattern>
    <Modal show={showPrompt} animation={false} onHide={handleClosePrompt}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Everything written will be deleted. Do you still want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePrompt}>
            No
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Yes
          </Button>
        </Modal.Footer>
    </Modal>
    <Footer/>    
  </>
}

const WriteForm = compose(withFirebase, withAuthentication)(WriteFormBase);

export default WriteForm;