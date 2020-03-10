import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <div className="tvm-header">
    <div className="tvm-header-content">
      <Link to="/">
        <img src="./images/tvm-header-logo.png" alt="tvm-logo" />
      </Link>
    </div>
  </div>
)

export default Header;