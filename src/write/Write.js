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

const WriteFormBase = ({match, authUser, firebase}) => {
// *** STATE ***
  const [subject, setSubject] = useSemiPersistentState('subject', '');

  const [content, setContent] = useSemiPersistentState('content', '');

  const [author, setAuthor] = React.useState();

  const [authorId, setAuthorId] = React.useState();

  const [showPrompt, setShowPrompt] = React.useState(false);

  const [article, setArticle] = React.useState();

// *** HANDLER ***
  React.useEffect(() => {
    !!authUser && firebase.user(authUser.uid).on('value', snapshot => {
      const currentUser = snapshot.val();
      if(!!currentUser) {
        setAuthor(currentUser.username);
        setAuthorId(authUser.uid);
      } 
    });
  }, [authUser, firebase]);

  React.useEffect(() => {
    if(match.params.id){
      firebase.article(match.params.id).once('value', snapshot => {
        const _article = snapshot.val();
        setArticle(_article);
        setSubject(_article.subject);
        setContent(_article.content);
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
    window.location.replace('/write');
  }

  const handleSubmit = (event) => {
    if(match.params.id){
      firebase.article(match.params.id).set({
        ...article,
        content: content,
      });
      firebase.histories().push({
        article_id: match.params.id,
        editor: author,
        editor_id: authorId,
        date: new Date().toString(),
      });
    }else{
      firebase.articles().push({
        subject: subject,
        content: content,
        author: author,
        author_id: authorId,
        date: new Date().toString(),
      })
    }
    setSubject('');
    setContent('');
    window.location.replace('/write');
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
              <div className='form-group text-right'>
                <button type='button' className="btn btn-danger" style={{width:80}} onClick={handleShowPrompt}>Cancel</button>
                <button type="submit" className="btn btn-success mx-sm-2" style={{width:80}}>Submit</button>
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