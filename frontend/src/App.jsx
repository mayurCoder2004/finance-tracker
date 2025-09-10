import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import DeletePage from './pages/DeletePage';

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container" style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/add" element={<AddPage/>} />
          <Route path="/:id/edit" element={<EditPage/>} />
          <Route path="/:id/delete" element={<DeletePage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
