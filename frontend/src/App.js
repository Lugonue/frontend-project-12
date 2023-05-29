import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

import './i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import HomePage from './components/pages/HomePage';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import SignUp from './components/pages/SignUp';

//notifications
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [auth, setAuth] = useState(false);
  const value = {
    authorized: auth,
    setAuth: setAuth
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage toast={toast} />} />
        <Route path="/login" element={<Login toast={toast} />} />
        <Route path='/signup' element={<SignUp toast={toast} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </BrowserRouter>
  );
}

export default App;
