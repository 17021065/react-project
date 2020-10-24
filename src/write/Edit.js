import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { compose } from 'recompose';
import { Tabs, Tab, Modal, Button, Alert } from 'react-bootstrap';
import PagePattern from '../pattern/PagePattern';
import $ from 'jquery';
import { withAuthentication} from '../controller/session';
import { withFirebase } from '../controller/firebase';

const EditFormBase = ({match, authUser, firebase}) => {
// *** STATE ***
  const [subject, setSubject] = React.useState('');

  const [content, setContent] = React.useState('');

  const [editor, setEditor] = React.useState();

  const [editorId, setEditorId] = React.useState();

  const [showCancelPrompt, setShowCancelPrompt] = React.useState(false);

  const [showRequireSigninPrompt, setShowRequireSigninPrompt] = React.useState(false);

  const [article, setArticle] = React.useState();

// *** HANDLER ***
  React.useEffect(() => {
    !!authUser && firebase.user(authUser.uid).once('value', snapshot => {
      const currentUser = snapshot.val();
      if(!!currentUser) {
        setEditor(currentUser.username);
        setEditorId(authUser.uid);
      } 
    });
  }, [authUser, firebase]);

  React.useEffect(() => {
    firebase.article(match.params.id).once('value', snapshot => {
      const _article = snapshot.val();
      setArticle(_article);
      setSubject(_article.subject);
      setContent(_article.content);
    });
  }, [match, setSubject, setContent, firebase]);

  React.useEffect(() => {
    $('#subject').html(subject);
    $('#content').html(content);
  }, [subject, content]);
  
  const handleInitCkeditor = (editor) => editor.setData(content);

  const handleContentChange = (event, editor) => setContent(editor.getData());
  
  const handleCloseCancelPrompt = () => setShowCancelPrompt(false);

  const handleShowCancelPrompt = () => setShowCancelPrompt(true);

  const handleCloseRequireSigninPrompt = () => setShowRequireSigninPrompt(false);

  const handleCancel = (event) => {
    window.location.replace(`/article/${match.params.id}`);
  }

  const handleSubmit = (event) => {
    if(!authUser){
      setShowRequireSigninPrompt(true);
    }else{
      firebase.article(match.params.id).set({
        ...article,
        content: content,
      })
      .then(() => {
        firebase.histories(match.params.id).push({
          editor: editor,
          editor_id: editorId,
          date: new Date().toString(),
        });
      })
      .then(() => {
        window.location.replace(`/article/${match.params.id}`);
      })
      .catch(err => {
        console.log(err);
        event.stopPropagation();
      });
    }
    event.preventDefault();
  } 

// *** RENDER ***
  return <>
    <PagePattern>
      <Tabs defaultActiveKey="writing" transition={false} id="noanim-tab-example">
        <Tab eventKey="writing" title="Writing Page" className='mx-3 mt-2'>
          {!authUser && <Alert variant='warning'>You have to sign in to submit change!</Alert>}
            <p style={{fontSize: 50}} className='text-left'>{subject}</p>
            <hr></hr>
            <form className='was-validated' onSubmit={handleSubmit}>
              <div className="form-group">
                <CKEditor 
                  editor={ClassicEditor} 
                  data={content}
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
        <Modal.Body>The change will be canceled. Do you still want to continue?</Modal.Body>
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

const EditForm = compose(withFirebase, withAuthentication)(EditFormBase);

export default EditForm;