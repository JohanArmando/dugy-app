import { combineReducers } from 'redux'
import auth from './auth'
import pets from './pets'
import races from './races'
import sizes from './sizes'
import plans from './plans'
import services from './services'
import servicesHistory from './servicesHistory'

const Dugy = combineReducers({
  auth,
  pets,
  races,
  sizes,
  plans,
  services,
  servicesHistory
})

export default Dugy
