import { connect } from 'react-redux'
import ViewProfilePet from '../../scenes/ProfilePet/ViewProfilePet'
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
    })
  }
}

const ViewProfilePetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfilePet)

export default ViewProfilePetContainer
