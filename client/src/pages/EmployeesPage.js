import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchEmployees, employeesSelector, getEmployeesSorted } from '../slices/employees'

import { Employee } from '../components/Employee'
import  Search  from '../components/Search'

import Table from 'react-bootstrap/Table'

const EmployeesPage = () => {
  const dispatch = useDispatch()
  const { employees, loading, hasErrors, filteredBy, isSorted} = useSelector(employeesSelector)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

 
  const renderEmployees = () => {
    if (loading) return <p>Loading employees...</p>
    if (hasErrors) return <p>Unable to display employees.</p>

    if (filteredBy) return employees.filter(
       employee => employee.name.first.toLowerCase() === filteredBy || employee.name.last.toLowerCase() === filteredBy)
      .map((employee, i) => <Employee key={i} employee={employee} />)
    
    if (isSorted) {
      let e = [...employees]
      return e.sort((a, b) => a.name.first.localeCompare(b.name.first))
      .map((employee, i) => <Employee key={i} employee={employee} />)
    }
    
    return employees.map((employee, i) => <Employee key={i} employee={employee} />)
  }
  
  const sortEmployees = (e) => {
    e.preventDefault()
    dispatch(getEmployeesSorted())
  }

  return (
    <div>
    <Search></Search>
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Photo</th>
        <th onClick={sortEmployees}>First Name</th>
        <th>Last Name</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      {renderEmployees()}
      </tbody>
    </Table>
    </div>
  )
}

export default EmployeesPage
