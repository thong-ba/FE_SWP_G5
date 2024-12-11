import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
import './index.css';

ReactDOM.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
// import React from 'react';
// import { createRoot } from 'react-dom/client';  // Sử dụng createRoot thay vì ReactDOM.render
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// const container = document.getElementById('root'); // Lấy phần tử có id "root"
// const root = createRoot(container);  // Tạo root mới với createRoot

// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
