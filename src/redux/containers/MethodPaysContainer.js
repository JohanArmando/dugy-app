import { connect } from 'react-redux'
import MethodPays from '../../scenes/MethodPays/MethodPays'
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
    user: state.auth
  }
}

const MethodPaysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MethodPays)

export default MethodPaysContainer
