import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import HomePage from './components/HomePage';
import Login from './components/Login';
import NotFound from './components/NotFound';


function App() {
  const [auth, setAuth] = useState(false);
  const value = {
    authorized: auth,
    setAuth: setAuth
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
