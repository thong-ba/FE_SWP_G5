import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Đảm bảo nhập đúng BrowserRouter từ react-router-dom
import App from './App';
import './index.css';

ReactDOM.render(
  <BrowserRouter> {/* Đảm bảo rằng bạn bọc toàn bộ ứng dụng với BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
