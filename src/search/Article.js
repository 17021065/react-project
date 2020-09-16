import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import database from '../database';
import { Tabs, Tab, } from 'react-bootstrap';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

const Article = ({match}) => {

// Start declare state
  const [edit, setEdit] = React.useState(false);
// End declare state

// Start handle state
  const handleEditRequest = () => setEdit(true);

  const article = database.filter(item => 
    item.articleID === (match.params.articleID*1)
  );

  React.useEffect(() => {
    $('#content').html(article[0].content);
  }, [article]);
// End handle state

  return <> 
    <PagePattern>
    <Tabs defaultActiveKey="article" transition={false} id="noanim-tab-example">
      <Tab eventKey="article" title="Article">
      <div className='m-5 text-left'>
        <h1>{article[0].subject}
          <button className='btn btn-primary float-right' style={{position:"relative", top: 5}} onClick={handleEditRequest}>Edit Article</button> 
        </h1>
        <hr></hr>
        <br></br>
        <p id='content'></p>
      </div>
      </Tab>
      <Tab eventKey="history" title="Edit History">
        dsadads
      </Tab>
    </Tabs>
    </PagePattern>
    {edit && <Redirect to={`/write/${match.params.articleID}`}></Redirect>}
    <Footer/>
  </>
}

export default Article;