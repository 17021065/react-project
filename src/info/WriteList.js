import React from 'react'
import { Card } from 'react-bootstrap';

const WriteList = ({list}) => {
  return <div className='col-6 p-3 border-right'>
    <p style={{fontSize: 25}}>Articles written: <strong>{list.length}</strong></p>
    {list.map((item)=>
      <Card className='bg-light' key={item.aid}>
        <Card.Body>
          <Card.Link href={`/article/${item.aid}`}>{item.subject}</Card.Link>
          <Card.Text>{item.date}</Card.Text>
        </Card.Body>
      </Card>
    )}
</div>
}

export default WriteList;