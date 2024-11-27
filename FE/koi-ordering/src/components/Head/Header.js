import React from 'react';
import { Link } from 'react-router-dom'; // Đảm bảo Link được nhập đúng

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/login">Đăng nhập</Link></li>
          <li><Link to="/register">Đăng ký</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
