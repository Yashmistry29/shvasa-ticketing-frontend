import React from 'react'
import { Grid, Fab, Modal, Box } from '@mui/material'
import TableData from '../components/TableData';
import AddIcon from '@mui/icons-material/Add';
import TicketModal from '../components/TicketsElements/TicketModal';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utils/HelpersMethod';

export default function Homepage() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [tickets, setTickets] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);

  React.useEffect(() => {
    const token = localStorage.getItem('Authenticated');
    if (token)
      navigate('/dashboard', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    var arr = localStorage.getItem('MyTickets');
    if (arr != null) {
      arr = arr.split(',')
      sendRequest("/api/support-tickets/getAllTicketsById", "POST", { tickets: arr })
        .then((res) => {
          if (res.success) {
            // console.log(res.data)
            var data = res.data
            tickets.splice(0, tickets.length);
            setTickets([...data]);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(tickets);


  return (
    <div className='ma4'>
      <div>
        <p className='b f3-l f4-m f5'>Your Tickets</p>
      </div>
      <div className='flex w-90 center mt4 table-border br2'>
        <Grid container direction="row" alignItems="center" justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <TableData data={tickets} setPage={setPage} page={page} setData={setTickets} />
          </Grid>
        </Grid>
      </div>
      <div>
        <Fab
          variant='extended'
          color="primary"
          aria-label="add"
          onClick={HandleOpen}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(8),
            right: (theme) => theme.spacing(8)
          }}>
          <AddIcon fontSize='large' className='mr1' />
          <p className='b'>Create New Ticket</p>
        </Fab>
      </div>
      <Modal
        open={open}
        onClose={HandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-60-l w-80-ns w-70-md absolute bw2 br3 bg-washed-blue b--navy" sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <TicketModal />
        </Box>
      </Modal>
    </div>
  )
}
