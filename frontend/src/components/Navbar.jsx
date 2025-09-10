import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav style={{display:'flex',justifyContent:'space-between',padding:'0.5rem 1rem',background:'#222',color:'#fff'}}>
      <div style={{fontWeight:700}}>Personal Finance Tracker</div>
      <div style={{display:'flex',gap:'1rem'}}>
        <Link to="/" style={{color:'#fff'}}>Home</Link>
        <Link to="/add" style={{color:'#fff'}}>Add</Link>
      </div>
    </nav>
  );
}
