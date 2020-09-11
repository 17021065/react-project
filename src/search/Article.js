import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import database from '../database';
import useSemiPersistentState from '../controller/State';
import Footer from '../pattern/Footer';
import PagePattern from '../pattern/PagePattern';

const Article = ({match}) => {
    console.log(match.params.articleID*1===2);
    const article = database.filter(item => 
        item.articleID === (match.params.articleID*1)
    );
    console.log(article[0].subject);
    return <> 
        <PagePattern>
            <div className='m-5 text-left'>
                <h1>{article[0].subject}</h1>
                <hr></hr>
                <br></br>
                <p>{article[0].content}</p>
            </div>
        </PagePattern>

        <Footer/>
    </>
}

export default Article;