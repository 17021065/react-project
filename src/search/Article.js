import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Spinner,} from 'react-bootstrap';
import PagePattern from '../pattern/PagePattern';
import HistoryTable from './HistoryTable';
import $ from 'jquery';
import { compose } from 'recompose';
import { withFirebase } from '../controller/firebase';

const ArticleBase = ({match, firebase}) => {

// *** STATE ***
  const [article, setArticle] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  const [hisList, setHisList] = React.useState([]);

// *** HANDLER ***
  const handleEditRequest = () => window.location.replace(`/edit/${match.params.id}`);

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

  React.useEffect(() => {
    firebase.histories(match.params.id).once('value', snapshot => {
      const historiesObject = snapshot.val();
      if(historiesObject === null){
        setHisList(null);
      }else{
        const historiesList = Object.keys(historiesObject).map(key => ({
          ...historiesObject[key],
          hid: key,
        }));
        setHisList(historiesList);
      }
    });
  }, [match, firebase]);

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
                  <div className='col-6'>
                    <p id='subject' style={{fontSize: 50}}></p>
                  </div>
                  <div className='col-6 text-right pt-4'>
                    <button className='btn btn-primary' onClick={handleEditRequest}>Edit Article</button> 
                  </div>
                </div>
                <hr></hr>
                <br></br>
                <p id='content'/>
                <div className='text-right'>
                  Written by <a href={`/profile/${article.author_id}`}>{article.author}</a> at {article.date}
                </div>
              </>
            )
          )} 
        </div>
        </Tab>
        <Tab eventKey="history" title="Edit History">
          <div className='m-4'>
            {!hisList ? (
                <p>There is no editing on this post.</p>
              ):(
                <HistoryTable hisList={hisList} />
              )
            }
          </div>
        </Tab>
      </Tabs>
    </PagePattern>
  </>
}

const Article = compose(withFirebase)(ArticleBase);

export default Article;