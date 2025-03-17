
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/moblieMenu.css';



function MobileMenu({ isOpen, onClose, user, logOut }) {
  return (
    <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <ul className="mobile-links">
        <li><Link to="/" onClick={onClose}>Home</Link></li>
        {user ? (
          <>
            <li><Link to="/createTask" onClick={onClose}>Create Task</Link></li>
            <li><Link onClick={() => { logOut(); onClose(); }}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/register" onClick={onClose}>Sign Up</Link></li>
            <li><Link to="/login" onClick={onClose}>Log In</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default MobileMenu;
