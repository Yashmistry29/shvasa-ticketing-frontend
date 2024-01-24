import React from 'react'
import { CssTextField } from '../FormElements/TextfieldForm'
import { severity, TicketType, Ticket } from '../../utils/initialValue'
import { MenuItem, Grid } from '@mui/material'
import { validateTicket } from "../../utils/FormValidation";
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from '../../utils/HelpersMethod';

function TicketModal() {
  const [data, setData] = React.useState(Ticket);
  const [errors, setErrors] = React.useState({});
  const [tickets, setTickets] = React.useState([]);
  const resetData = Ticket;

  const handleReset = (e) => {
    setData(resetData);
    setErrors({});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTicket(data);
    const isValid = Object.keys(validationErrors).length === 0;
    console.log(validationErrors, isValid);
    setErrors(validationErrors);
    if (isValid) {
      //   // console.log(data);
      sendRequest("/api/support-tickets/createTicket", "POST", data)
        .then(res => {
          // console.log(res);
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            tickets.push(res.data);
            localStorage.setItem('MyTickets', tickets);
            handleReset();

          }
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      toast.error("Please check you Inputs");
    }
  };

  React.useEffect(() => {
    var arr = localStorage.getItem('MyTickets')
    if (arr != null) {
      arr = arr.split(',')
      tickets.splice(0, tickets.length);
      setTickets([...arr]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(tickets);

  return (
    <div className='flex flex-column items-center'>
      <ToastContainer />
      <div>
        <p className='b f3-l f4-m f5'>Create New Ticket</p>
      </div>
      <Grid container direction="row" alignItems="flex-start" justify="space-between" spacing={3}>
        <Grid item xs={12} md={6}>
          <div className='flex justify-start items-center'>
            <pre className='black b'>Topic        </pre>
            <CssTextField
              variant='outlined'
              name='topic'
              className='w-80'
              onChange={handleChange}
              value={data.topic}
              {...(errors.topic && { error: true, helperText: errors.topic })}
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className='black b'>Severity     </pre>
            <CssTextField
              select
              size='small'
              variant='outlined'
              name='severity'
              className='w-80'
              onChange={handleSelect}
              value={data.severity}
            >
              {
                severity.map((type) => (
                  <MenuItem key={type.value} value={type.value} sx={{
                    "& li": {
                      backgroundColor: "white",
                    },
                    "&:hover": {
                      backgroundColor: "#2563eb",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#9966cb",
                    }
                  }}>
                    {type.name}
                  </MenuItem>
                ))
              }
            </CssTextField>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className='flex justify-start items-center'>
            <pre className='black b'>Created At  </pre>
            <CssTextField
              name='createdAt'
              className='w-80'
              variant='outlined'
              value={data.createdAt.getDate() + '-' + Number(data.createdAt.getMonth() + 1) + '-'
                + data.createdAt.getFullYear()}
              // focused
              disabled
            />
          </div>
          <div className='flex justify-start items-center'>
            <pre className='black b'>Type        </pre>
            <CssTextField
              select
              size='small'
              variant='outlined'
              name='type'
              className='w-80'
              onChange={handleSelect}
              value={data.type}
            >
              {
                TicketType.map((type) => (
                  <MenuItem key={type.value} value={type.value} sx={{
                    "& li": {
                      backgroundColor: "white",
                    },
                    "&:hover": {
                      backgroundColor: "#2563eb",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#9966cb",
                    }
                  }}>
                    {type.name}
                  </MenuItem>
                ))
              }
            </CssTextField>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className='flex w-100 justify-start items-start'>
            <pre className='black b'>Description  </pre>
            <CssTextField
              multiline
              rows={3}
              variant='outlined'
              name='description'
              fullWidth
              onChange={handleChange}
              value={data.description}
              {...(errors.description && { error: true, helperText: errors.description })}
            />
          </div>
        </Grid>
      </Grid>
      <div className='flex w-80 flex-row-l flex-column-m items-center justify-center pv2'>
        <div className='flex flex-row items-center'>
          <p
            style={{ backgroundColor: "#4338ca" }}
            className='b--black link pointer tc ma2 bg-button light-gray ba bw1 dim dib w3 w4-l w4-m pa2 br2'
            onClick={handleSubmit}
          >Submit</p>
          <p
            style={{ backgroundColor: "#4338ca" }}
            className='b--black link pointer tc ma2 bg-button light-gray ba bw1 dim dib w3 w4-l w4-m pa2 br2'
            onClick={handleReset}
          >Reset</p>
        </div >
      </div>
    </div >
  )
}

export default TicketModal