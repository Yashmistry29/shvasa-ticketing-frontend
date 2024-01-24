import React from 'react'

function TicketDetails({ data }) {

  var createdAt = new Date(data.dateCreated);
  var resolvedDate = new Date(data.resolvedOn);

  return (
    <div className='pt1 b font'>
      <pre>{`Ticket Id\t\t: ${data._id === undefined ? "" : data._id}`}</pre>
      <pre>{`Date Created\t: ${data.dateCreated === undefined ? "" : createdAt.toDateString()}`}</pre>
      <pre>{`Topic\t\t: ${data.topic === undefined ? "" : data.topic}`}</pre>
      <pre>{`Severity\t\t: ${data.severity === undefined ? "" : data.severity}`}</pre>
      <pre>{`Type\t\t: ${data.type === undefined ? "" : data.type}`}</pre>
      <pre>{`Status\t\t: ${data.status === undefined ? "" : data.status}`}</pre>
      <pre>{`Resolved On\t: ${data.status === 'Resolved' ? resolvedDate.toDateString() : ''}`}</pre>
      <pre>{`Assigned To\t: ${data.status === 'New' ? '' : data.assignedTo}`}</pre>
      <div className='flex item-center pv0'>
        <pre>{'Description\t: '}</pre><p>{data.description === undefined ? "" : data.description}</p>
      </div>
    </div>
  )
}

export default TicketDetails