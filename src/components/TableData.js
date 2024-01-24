import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  Collapse,
  Box,
  Paper,
  Modal,
} from '@mui/material';
import { StyledTableCell as TableCell, StyledTableRow as TableRow } from './FormElements/TableForm';
import ReplayIcon from '@mui/icons-material/Replay';
import DoneIcon from '@mui/icons-material/Done';
import TicketDetails from './TicketsElements/TicketDetails';
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from '../utils/HelpersMethod';

const CollapsibleRows = (props) => {

  const { data, index, HandleReOpen, HandleResolve } = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  var createdAt = new Date(data.dateCreated);
  var resolvedDate = new Date(data.resolvedOn);


  const HandleClose = () => setModalOpen(false);
  const HandleOpen = () => setModalOpen(true);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell align='center' onClick={() => setOpen(!open)}>{data._id}</TableCell>
        <TableCell align='center' onClick={() => setOpen(!open)}>{createdAt.toDateString()}</TableCell>
        <TableCell align='center' onClick={() => setOpen(!open)}>{data.topic}</TableCell>
        <TableCell align='center' onClick={() => setOpen(!open)}>{data.severity}</TableCell>
        <TableCell align='center' onClick={() => setOpen(!open)}>{data.type}</TableCell>
        {/* <TableCell onClick={() => setOpen(!open)}>{data.AssignedTo}</TableCell> */}
        <TableCell align='center' onClick={() => setOpen(!open)}>{data.status}</TableCell>
        <TableCell align='center' onClick={() => setOpen(!open)}>{data.status === 'Resolved' ? resolvedDate.toDateString() : ''}</TableCell>
        <TableCell align='center'>{data.status === 'Resolved' ?
          <ReplayIcon className='pv1 pointer' onClick={(e) => HandleReOpen(e, data, index)} />
          :
          <DoneIcon className='pv1 pointer' onClick={(e) => HandleResolve(e, data, index)} />
        }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className='flex justify-start'>
                <button
                  className='button-border b--black f7-m link pointer tc ma2 bg-button white ba bw1 dim dib w3 w5-l w4-m pa2 br2'
                  onClick={HandleOpen}
                >Show Ticket Details</button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        open={modalOpen}
        onClose={HandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-50-l w-80-ns w-70-m absolute bw2 br3 bg-washed-blue b--navy" sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <TicketDetails data={data} />
        </Box>
      </Modal>
    </React.Fragment>
  )

}

function TableData({ data, page, setPage, setData }) {

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const HandleReOpen = (e, ticketdata, index) => {
    var tickets = data;
    // tickets.splice(index, 1);
    sendRequest('/api/support-tickets/reOpenTicket', "Post", { _id: ticketdata._id })
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
        tickets[index] = res.data;
        setData([...tickets])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const HandleResolve = (e, ticketdata, index) => {
    var tickets = data;
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
        tickets[index] = res.data;
        setData([...tickets])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Paper >
      <ToastContainer />
      <TableContainer className='br2 font'>
        <Table stickyHeader aria-label="Collapsible table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Ticket ID</TableCell>
              <TableCell align='center'>Date Created</TableCell>
              <TableCell align='center'>Topic</TableCell>
              <TableCell align='center'>Severity</TableCell>
              <TableCell align='center'>Type</TableCell>
              {/* <TableCell>Assigned to</TableCell> */}
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Resolved On</TableCell>
              <TableCell align='center'>Resolve / Re-open</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.length === 0 ? null :
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                  index = index + (page * rowsPerPage)
                  return (<CollapsibleRows data={data} key={index} index={index} HandleReOpen={HandleReOpen} HandleResolve={HandleResolve} />)
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        data.length === 0 ? null :
          <TablePagination
            rowsPerPageOptions={[5, 8, 10, 15, { value: data.length, label: 'All' }]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      }
    </Paper>
  )
}

export default TableData