import { connect } from 'react-redux'
import Profile from '../../scenes/Profile/Profile'
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

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer
