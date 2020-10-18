import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Spinner,} from 'react-bootstrap';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import HistoryTable from './HistoryTable';
import $ from 'jquery';
import { compose } from 'recompose';
import { withFirebase } from '../controller/firebase';

let history = [
  {
    id: 1,
    name: 'man1',
    email: 'man1@gmail.com',
    date: new Date().toString(),
  },
  {
    id: 2,
    name: 'man2',
    email: 'man2@gmail.com',
    date: new Date().toString(),
  },
  {
    id: 3,
    name: 'woman1',
    email: 'woman1@gmail.com',
    date: new Date().toString(),
  },
  {
    id: 4,
    name: 'woman2',
    email: 'woman2@gmail.com',
    date: new Date().toString(),
  },
]

const ArticleBase = ({match, firebase}) => {

// *** STATE ***
  const [article, setArticle] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

// *** HANDLER ***
  const handleEditRequest = () => window.location.replace(`/write/${match.params.id}`);

  React.useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    firebase.article(match.params.id).once('value', snapshot => {
      const _article = snapshot.val();
      setArticle(_article);
    })
    .then(() => {
      setIsLoading(false);
      $('#subject').html(article.subject);
      $('#content').html(article.content);
    })
    .catch(err => {
      console.log(err);
      setIsError(true);
    });
  }, [match, firebase, article]);

// *** RENDER ***
  return <> 
    <PagePattern>
      <Tabs defaultActiveKey="article" transition={false} id="noanim-tab-example">
        <Tab eventKey="article" title="Article">
        <div className='m-5 text-left'>
          {isError ? (
            <p>Something went wrong...</p>
          ):(
            isLoading ? (
              <Spinner animation="border" />
            ):(
              <>
                <div className='row'>
                  <div className='col-6'><h1 className='display-4' id='subject'>@subject</h1></div>
                  <div className='col-6 text-right pt-4'>
                    <button className='btn btn-primary' onClick={handleEditRequest}>Edit Article</button> 
                  </div>
                </div>
                <hr></hr>
                <br></br>
                <p id='content'/>
              </>
            )
          )} 
        </div>
        </Tab>
        <Tab eventKey="history" title="Edit History">
          <div className='m-4'>
            <HistoryTable history={history}/>
          </div>
        </Tab>
      </Tabs>
    </PagePattern>

    <Footer/>
  </>
}

const Article = compose(withFirebase)(ArticleBase);

export default Article;