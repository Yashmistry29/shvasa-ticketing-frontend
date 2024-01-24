import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utils/HelpersMethod';
import { toast, ToastContainer } from 'react-toastify';


export default function Dashboard() {
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [pendingTickets, setPendingTickets] = useState([]);

  const navigate = useNavigate();

  const HandleResolve = (e, ticketdata, index) => {
    pendingTickets.splice(index, 1);
    sendRequest('/api/support-tickets/resolveTicket', "Post", { _id: ticketdata._id })
      .then((res) => {
        toast.info(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
        var data = resolvedTickets
        data.push(res.data);
        setResolvedTickets([...data])
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('Authenticated');
    if (!token)
      navigate('/login', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const _id = localStorage.getItem('AgentId');
    sendRequest('/api/support-tickets/resolvedByAgent', "Post", { _id: _id })
      .then((res) => {
        var data = res.data
        // console.log(res)
        resolvedTickets.splice(0, resolvedTickets.length);
        setResolvedTickets([...data]);
      }).catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const _id = localStorage.getItem('AgentId');
    sendRequest('/api/support-tickets/assignedToAgent', "Post", { _id: _id })
      .then((res) => {
        var data = res.data
        // console.log(res)
        pendingTickets.splice(0, resolvedTickets.length);
        setPendingTickets([...data]);
      }).catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='ma3'>
      <ToastContainer />
      <div>
        {pendingTickets.length !== 0 && <p className='b f3-l f4-m f5 ma0'>Current Ticket</p>}
      </div>
      <div className='flex flex-column-m flex-row-l justify-start'>
        {
          pendingTickets.map((data, index) => {
            var createdAt = new Date(data.dateCreated);
            return (
              <div className='ph3-l pv1-m' key={index}>
                <article className="mw mw6-ns hidden ba mv4" title={data.description}>
                  <h1 className="f4 bg-near-black white mv0 pv1 ph3">{data._id}</h1>
                  <div className="pa1">
                    <pre>{`Topic\t\t: ${data._id === undefined ? "" : data.topic}`}</pre>
                    <pre>{`Date Created\t: ${data.dateCreated === undefined ? "" : createdAt.toDateString()}`}</pre>
                    <pre>{`Severity\t: ${data.severity === undefined ? "" : data.severity}`}</pre>
                    <pre>{`Type\t\t: ${data.type === undefined ? "" : data.type}\t`}</pre>
                  </div>
                  <p
                    className='ma1 flex flex-row justify-center dim pointer bg-black w-3 white pa1 items-end'
                    onClick={(e) => HandleResolve(e, data, index)}
                  >Resolve Ticket</p>
                </article>
              </div>
            )
          })
        }
      </div>
      <div>
        {resolvedTickets.length !== 0 && <p className='b f3-l f4-m f5 ma0'>My Resolved Tickets</p>}
      </div>
      <div className='flex flex-column-m flex-row-l justify-start'>
        {
          resolvedTickets.map((data, index) => {
            var resolvedDate = new Date(data.resolvedOn);
            var createdAt = new Date(data.dateCreated);
            return (
              <div className='ph3-l pv1-m' key={index}>
                <article className="mw mw6-ns hidden ba mv4" title={data.description}>
                  <h1 className="f4 bg-near-black white mv0 pv1 ph3">{data._id}</h1>
                  <div className="pa1">
                    <pre>{`Topic\t\t: ${data._id === undefined ? "" : data.topic}`}</pre>
                    <pre>{`Date Created\t: ${data.dateCreated === undefined ? "" : createdAt.toDateString()}`}</pre>
                    <pre>{`Resolved On\t: ${resolvedDate.toDateString()}`}</pre>
                    <pre>{`Severity\t: ${data.severity === undefined ? "" : data.severity}`}</pre>
                    <pre>{`Type\t\t: ${data.type === undefined ? "" : data.type}\t`}</pre>
                  </div>
                </article>
              </div>
            )

          })
        }
      </div>
    </div>
  )
}
