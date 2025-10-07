import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const PaymentCheckout = lazy(() => import('./pages/PaymentCheckout.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={
        <div style={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          background: 'linear-gradient(135deg, #ffeef8 0%, #f0e6ff 100%)'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#c44569',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(196,69,105,0.2)',
              borderTop: '4px solid #c44569',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            Yükleniyor...
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="payment" element={<PaymentCheckout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
