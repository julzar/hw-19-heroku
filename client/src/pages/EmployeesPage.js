import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchEmployees, employeesSelector } from '../slices/employees'

import { Employee } from '../components/Employee'
import  Search  from '../components/Search'

import Table from 'react-bootstrap/Table'

const EmployeesPage = () => {
  const dispatch = useDispatch()
  const { employees, loading, hasErrors, filteredBy} = useSelector(employeesSelector)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  const renderEmployees = () => {
    if (loading) return <p>Loading employees...</p>
    if (hasErrors) return <p>Unable to display employees.</p>

    if (filteredBy) return employees.filter(
       employee => employee.name.first === filteredBy || employee.name.last === filteredBy)
      .map((employee, i) => <Employee key={i} employee={employee} />)
    
    return employees.map((employee, i) => <Employee key={i} employee={employee} />)
  }
  
  return (
    <div>
    <Search></Search>
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Photo</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
      </thead>
      {renderEmployees()}
    </Table>
    </div>
  )
}

export default EmployeesPage
