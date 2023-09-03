import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
    <div className='logo'>
        <Link to='/'>Arash</Link>
      </div>
      
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/allmeals'>All-Meals</Link></li>
        <li><Link to='/lol'>Contact</Link></li>
      </ul>
    </header>
  )
}

export default Header