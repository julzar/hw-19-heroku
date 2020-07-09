import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import EmployeesPage from './pages/EmployeesPage'

const App = () => {
  return (
    <Router>
        <Route exact path="/" component={EmployeesPage} />
    </Router>
  )
}

export default App
