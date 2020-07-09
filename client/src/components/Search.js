import React from 'react'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { useDispatch } from 'react-redux'

import { getEmployeesFiltered } from '../slices/employees'

const Search = () => {
  const dispatch = useDispatch()

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch( getEmployeesFiltered(document.getElementById('search').value.trim() ) )
  }

  return (
  <Form inline onSubmit={submitHandler} className="mb-2">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" id='search' name='search' />
      <Button type='submit' variant="outline-success">Search</Button>
  </Form>
  )
}

export default Search