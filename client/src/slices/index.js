import { combineReducers } from 'redux'

import employeesReducer from './employees'

const rootReducer = combineReducers({
  employees: employeesReducer,
})

export default rootReducer
