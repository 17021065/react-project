import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import database from '../database';
import { Tabs, Tab, } from 'react-bootstrap';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';

const Article = ({match}) => {
  const article = database.filter(item => 
    item.articleID === (match.params.articleID*1)
  );
  return <> 
    <PagePattern>
    <Tabs defaultActiveKey="article" transition={false} id="noanim-tab-example">
      <Tab eventKey="article" title="Article">
      <div className='m-5 text-left'>
        <h1>{article[0].subject}
          <button className='btn btn-primary float-right'>Edit Article</button> 
        </h1>
        <hr></hr>
        <br></br>
        <p>{article[0].content}</p>
      </div>
      </Tab>
      <Tab eventKey="history" title="Edit History">
        dsadads
      </Tab>
    </Tabs>
    </PagePattern>

    <Footer/>
  </>
}

export default Article;