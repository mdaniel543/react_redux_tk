import React from 'react';
import ReactDOM from 'react-dom/client';
import _Navbar from "./components/navbar"
import _Bottom from "./components/bottom"
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <_Navbar />
    <_Bottom key={4} placement={'bottom'} name={'Crear'}/>
  </React.StrictMode>
);

