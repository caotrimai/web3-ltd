import React from 'react';
import { Link } from 'react-router-dom';

export default function App ({ children }) {

  return (
    <div className='App'>
      <div className='page-container'>
        <Link to='/examples'>/examples</Link>
        {children}
      </div>
    </div>
  );
}
