import React from 'react'
import { Table, } from 'react-bootstrap'

const HistoriesTable = ({hisList}) => {
  return <>
    <Table responsive striped bordered size='sm'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {hisList.map((_, index) => <tr key={index+1}>
          <td>{index + 1}</td>
          <td><a href={`/profile/${hisList[index].editor_id}`}>{hisList[index].editor}</a></td>
          <td>{hisList[index].date}</td>
        </tr>
        )}
      </tbody>
    </Table>
  </>
}

export default HistoriesTable;