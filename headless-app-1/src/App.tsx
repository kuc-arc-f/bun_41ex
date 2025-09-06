import React from 'react';
//import { Route, Routes } from 'react-router';
import { Link, Route, Routes } from 'react-router-dom'
console.log('#app.tsx');

import Home from './client/Home';
import About from './client/about';
import Todo13 from './client/Todo13';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/todo13" element={<Todo13 />} />
            
    </Routes>
  );
}

export default App;
