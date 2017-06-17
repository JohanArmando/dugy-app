import { connect } from 'react-redux'
import DrawerLayout from '../../components/DrawerLayout/DrawerLayout'
import { logout } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    close: ownProps.close,
    user: state.auth
  }
}

const DrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerLayout)

export default DrawerContainer
