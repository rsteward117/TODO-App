import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Nav from './componets/nav'
import Home from './componets/home'
import Register from './componets/register'
import Login from './componets/login'
import './App.css'
import CreateTask from './componets/createTask';
import EditTask from './componets/editTask';


function App() {

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/createTask' element={<CreateTask />} />
          <Route path='/editTask/:taskId' element={<EditTask />} />
        </Routes>
      </Router>
    </>
  )
}

export default App