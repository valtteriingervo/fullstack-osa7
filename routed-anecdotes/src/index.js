import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
