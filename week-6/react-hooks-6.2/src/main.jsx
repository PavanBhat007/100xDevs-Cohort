import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Effect, Memo } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Memo />
)
