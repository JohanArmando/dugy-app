import { connect } from 'react-redux'
import EditProfile from '../../scenes/Profile/EditProfile'
import { updateStore } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  store: (user) => {
    dispatch(updateStore(user));
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
    attr: ownProps.attr
  }
}

const EditProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)

export default EditProfileContainer
