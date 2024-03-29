import { connect } from 'react-redux'
import ProfilePet from '../../scenes/ProfilePet/ProfilePet'
import { updatePet } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  updatePet: (pet) => {
    dispatch(updatePet(pet));
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    pet: state.pets.find((pet) => {
      if (pet.id == ownProps.pet.id) {
        return pet
      }
    }),
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
