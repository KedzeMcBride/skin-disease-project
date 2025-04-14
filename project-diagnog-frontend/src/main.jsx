import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import Landing from './landing'
//import Signin from './signin'
import App from './App.jsx'
//import Registration from './registration'
//import Signin from './signin'
//import Load from './load'
//import Contact_form from './contact_form'
//import About_load from './About-load'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
