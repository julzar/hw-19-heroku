import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  filteredBy: false,
  isSorted: false,
  employees: [],
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    getEmployees: state => {
      state.loading = true
    },
    getEmployeesSuccess: (state, { payload }) => {
      state.employees = payload.results
      state.loading = false
      state.hasErrors = false
    },
    getEmployeesFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    getEmployeesFiltered: (state, { payload }) => {
      state.filteredBy = payload.toLowerCase()
    },
    getEmployeesSorted: state => {
      state.isSorted = true
    }
  },
})

export const { getEmployees, getEmployeesSuccess, getEmployeesFailure, getEmployeesFiltered, getEmployeesSorted} = employeesSlice.actions
export const employeesSelector = state => state.employees
export const filteredSelector = state => state.filteredBy
export const sortedSelector = state => state.isSorted
export default employeesSlice.reducer

export function fetchEmployees() {
  return async dispatch => {
    dispatch(getEmployees())

    try {
      const response = await fetch('https://randomuser.me/api/?results=200&nat=us')
      const data = await response.json()

      dispatch(getEmployeesSuccess(data))
    } catch (error) {
      dispatch(getEmployeesFailure())
    }
  }
}

