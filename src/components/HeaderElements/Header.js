import React from 'react'
// import { AppBar, Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText, Toolbar, IconButton, Button, Drawer } from '@mui/material'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import '../../styles/Header.scss';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login", { replace: true });
  }

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns bg-lightest-blue">
      <div className='flex flex-row items-center align-center pointer' onClick={() => { navigate("/", { replace: true }) }}>
        <div><ConfirmationNumberIcon fontSize='large' /></div>
        <div><p className='f3 ph2 headerFont'>Ticketing System</p></div>
      </div>
      <div className="dtc v-mid tr">
        <p className="dark-gray f6 f5-ns dib-l dn-ns mr3 mr4-ns" title="Guide" >Help Guide</p>
        <p className="dark-gray f6 f5-ns dib-l dn-ns mr3 mr4-ns" title="About">About</p>
        <p className="dark-gray f6 f5-ns dib-l dn-ns mr3 mr4-ns" title="Contact Us">Contact Us</p>
        <p style={{ backgroundColor: "#082f49" }} className="link pointer white pa2 br2 ba tc dim dark-gray f6 f5-ns dib" onClick={handleLogin}>Login for Agents</p>
      </div>
    </nav>
  )
}
export default Header