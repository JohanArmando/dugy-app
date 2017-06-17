import { connect } from 'react-redux'
import MyDatesHistory from '../../scenes/MyDatesHistory/MyDatesHistory'
import { populateServicesHistory } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  populateServicesHistory: (services) => {
    dispatch(populateServicesHistory(services));
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    services: state.servicesHistory,
    pets: state.pets
  }
}

const MyDatesHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDatesHistory)

export default MyDatesHistoryContainer
