import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import MacroMonitor from './pages/MacroMonitor'
import SocialCreditTimeline from './pages/SocialCreditTimeline'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/monitor" element={<MacroMonitor />} />
        <Route path="/timeline" element={<SocialCreditTimeline />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
