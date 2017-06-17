import { connect } from 'react-redux'
import WalkerProfile from '../../scenes/WalkerProfile/WalkerProfile'
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

const WalkerProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalkerProfile)

export default WalkerProfileContainer
