import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import './assets/css/main.css';

import Dashboard from './components/Dashboard';
import Add from './components/Add';
import Edit from './components/Edit';

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

function App() {
  return (
      <div className="App">
        < BrowserRouter>
          <Routes>
            <Route path="/" element = {<Dashboard/>}/>
            <Route path="/add-employee" element = {<Add/>} />
            <Route path="/edit-employee/:id" element = {<Edit/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;