import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { Analytics } from '@vercel/analytics/react'
import { isAnalyticsAllowed } from './components/CookieConsent'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* DSGVO: Only load analytics if user explicitly consented via Cookie Banner */}
    {isAnalyticsAllowed() && <Analytics />}
  </React.StrictMode>,
)
