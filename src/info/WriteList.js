import React from 'react'
import { Card, Pagination } from 'react-bootstrap';

const solveData = (database) => {
  let raw = database;
  let processed = [];
  for(let n=0; n<raw.length; n+=10){
    if(n+10>raw.length){
      processed.push(raw.slice(n, raw.length));
    }else{
      processed.push(raw.slice(n, n+10));
    }
  }
  return [raw, processed];
}

const WriteList = ({list}) => {
  const [active, setActive] = React.useState(1);

  const [raw, processed] = solveData(list);

  const handlePagination = (event) =>{
    setActive(event.target.innerHTML*1);
  }

  let items = [];
  for (let number = 1; number <= processed.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={handlePagination}>
        {number}
      </Pagination.Item>
    );
  }

  return <div className='pl-sm-2'>
    <div>
      <p style={{fontSize: 25}}>Articles written: <strong className='text-primary'>{raw.length}</strong></p>
      <div className='border mr-sm-3' style={{minHeight: 700}}>
      {list.map((item)=>
        <Card className='bg-white border-0' key={item.aid} style={{fontSize: 20}}>
          <Card.Body>
            <Card.Link href={`/article/${item.aid}`}>{item.subject}</Card.Link>
            <Card.Text>{item.date}</Card.Text>
          </Card.Body>
        </Card>
      )}
      </div>
    </div>
    <div className='mx-auto mt-4'>
      <Pagination>{items}</Pagination>
    </div>
</div>
}

export default WriteList;