import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { compose } from 'recompose';
import { Tabs, Tab, Modal, Button, Alert } from 'react-bootstrap';
import useSemiPersistentState from '../controller/state/State'
import PagePattern from '../pattern/PagePattern';
import $ from 'jquery';
import { withAuthentication} from '../controller/session';
import { withFirebase } from '../controller/firebase';

const WriteFormBase = ({authUser, firebase}) => {
// *** STATE ***
  const [subject, setSubject] = useSemiPersistentState('subject', '');

  const [content, setContent] = useSemiPersistentState('content', '');

  const [author, setAuthor] = React.useState();

  const [authorId, setAuthorId] = React.useState();

  const [showCancelPrompt, setShowCancelPrompt] = React.useState(false);

  const [showRequireSigninPrompt, setShowRequireSigninPrompt] = React.useState(false);

// *** HANDLER ***
  React.useEffect(() => {
    !!authUser && firebase.user(authUser.uid).once('value', snapshot => {
      const currentUser = snapshot.val();
      if(!!currentUser) {
        setAuthor(currentUser.username);
        setAuthorId(authUser.uid);
      } 
    });
  }, [authUser, firebase]);

  React.useEffect(() => { 
    $('#subject').html(subject);
    $('#content').html(content);
  }, [subject, content]);
  
  const handleInitCkeditor = (editor) => editor.setData(content);

  const handleSubjectChange = (event) => setSubject(event.target.value);

  const handleContentChange = (event, editor) => setContent(editor.getData());
  
  const handleCloseCancelPrompt = () => setShowCancelPrompt(false);

  const handleShowCancelPrompt = () => setShowCancelPrompt(true);

  const handleCloseRequireSigninPrompt = () => setShowRequireSigninPrompt(false);

  const handleCancel = (event) => {
    setSubject('');
    setContent('');
    window.location.replace('/write');
  }

  const handleSubmit = (event) => {
    if(!authUser){
      setShowRequireSigninPrompt(true);
    }else{
      firebase.articles().push({
        subject: subject,
        content: content,
        author: author,
        author_id: authorId,
        date: new Date().toString(),
        view: 0,
      });
      setSubject('');
      setContent('');
      window.location.replace('/write');
    }
    event.preventDefault();
  } 

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
                  config={{ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command.
                      uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
                  }}}
                  onChange={handleContentChange}
                  onInit={handleInitCkeditor}
                />
              </div>
              <div className='form-group text-right'>
                <button type='button' className="btn btn-danger" style={{width:80}} onClick={handleShowCancelPrompt}>Cancel</button>
                <button type="submit" className="btn btn-success mx-sm-2" style={{width:80}}>Submit</button>
              </div>
            </form>
        </Tab>
        <Tab eventKey="preview" title="Preview Article">
          <div className='text-left mt-sm-2 ml-sm-3'> 
            <p id='subject' style={{fontSize: 50}}></p>
            <hr></hr>
            <br></br>
            <p id='content'></p>
          </div>
        </Tab>
      </Tabs>           
    </PagePattern>
    
  {/* *** PROMPT SETUP *** */}
    <Modal show={showCancelPrompt} animation={false} onHide={handleCloseCancelPrompt}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Everything written will be deleted. Do you still want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancelPrompt}>
            No
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Yes
          </Button>
        </Modal.Footer>
    </Modal>
    <Modal show={showRequireSigninPrompt} animation={false} onHide={handleCloseRequireSigninPrompt}>
        <Modal.Header closeButton>
          <Modal.Title>Prompt</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to sign in to perform this action.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRequireSigninPrompt}>
            Ok
          </Button>
        </Modal.Footer>
    </Modal>    
  </>
}

const WriteForm = compose(withFirebase, withAuthentication)(WriteFormBase);

export default WriteForm;