import { connect } from 'react-redux'
import ProfilePet from '../../scenes/ProfilePet/ProfilePet'
import { logout } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
    pet: ownProps.pet
  }
}

const ProfilePetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePet)

export default ProfilePetContainer
