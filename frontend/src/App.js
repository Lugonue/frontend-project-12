import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { useTranslation } from "react-i18next";

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

const rollbarConfig = {
  accessToken: '108b93124c1146cd9b0e9b7a71fdc335',
  environment: 'production',
};


function App() {

  const { t } = useTranslation();


  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage toast={toast} />} />
            <Route path="/login" element={<Login toast={toast} t={t} />} />
            <Route path='/signup' element={<SignUp toast={toast} t={t} />} />
            <Route path="*" element={<NotFound t={t} />} />
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
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
