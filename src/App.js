import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route, Routes,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage';
import Header from './components/HeaderElements/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import 'tachyons';
import DashboardHeader from './components/HeaderElements/DashboardHeader';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Homepage />
            </>
          } />
          <Route path='/login' element={
            <>
              <Header />
              <Login />
            </>
          } />
          <Route path='/signup' element={
            <>
              <Header />
              <Signup />
            </>
          } />
          <Route path='/dashboard' element={
            <>
              <DashboardHeader />
              <Dashboard />
            </>
          } />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
