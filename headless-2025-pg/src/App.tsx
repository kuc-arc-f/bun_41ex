import React from 'react';
//import { Route, Routes } from 'react-router';
import { Link, Route, Routes } from 'react-router-dom'
console.log('#app.tsx');

import Home from './client/Home';
import About from './client/about';
import Login from './client/Login';
import ContetData from './client/ContetData';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/data" element={<ContetData />} />
      
    </Routes>
  );
}

export default App;
