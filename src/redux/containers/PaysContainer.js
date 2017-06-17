import { connect } from 'react-redux'
import Pays from '../../scenes/Pays/Pays'
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

const PaysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pays)

export default PaysContainer
