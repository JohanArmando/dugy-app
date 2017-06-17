import { connect } from 'react-redux'
import ServiceDetails from '../../scenes/ServiceDetails/ServiceDetails'
import { logout, updateStore } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
  store: (user) => {
    dispatch(updateStore(user));
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
    service: ownProps.service,
    allPets: state.pets
  }
}

const ServiceDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceDetails)

export default ServiceDetailsContainer
