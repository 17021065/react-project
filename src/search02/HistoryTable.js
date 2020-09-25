import React from 'react'
import { Table, } from 'react-bootstrap'

const HistoryTable = ({history}) => {
  return <>
    <Table responsive striped bordered size='sm'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: history.length }).map((_, row) => <tr>
          <td>{row + 1}</td>
          <td>{history[row].name}</td>
          <td>{history[row].email}</td>
          <td>{history[row].date}</td>
        </tr>
        )}
      </tbody>
    </Table>
  </>
}

export default HistoryTable;