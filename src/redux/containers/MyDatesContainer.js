import { connect } from 'react-redux'
import MyDates from '../../scenes/MyDates/MyDates'
import { logout } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    services: state.services,
    pets: state.pets
  }
}

const MyDatesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDates)

export default MyDatesContainer
