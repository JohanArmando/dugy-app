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
    pet: ownProps.pet,
    user: state.auth,
    pets: state.pets,
    sizes: state.sizes,
    races: state.races
  }
}

const ProfilePetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePet)

export default ProfilePetContainer
