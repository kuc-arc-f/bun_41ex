import React from 'react';
//import { Route, Routes } from 'react-router';
import { Link, Route, Routes } from 'react-router-dom'
import Head from './components/Head'
console.log('#app.tsx');

//import Home from './client/Home';
import About from './client/about';
import Todo13 from './client/Todo13';
import Sort from './client/Sort';
import Table from './client/Table';

function Home() {
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >home</h1>
  </div>
  );
}


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/todo13" element={<Todo13 />} />
      <Route path="/sort" element={<Sort />} />
      <Route path="/table" element={<Table />} />
    </Routes>
  );
}

export default App;
