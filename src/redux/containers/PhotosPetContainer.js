import { connect } from 'react-redux'
import PhotosPet from '../../scenes/PhotosPet/PhotosPet'
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
    user: state.auth
  }
}

const PhotosPetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotosPet)

export default PhotosPetContainer
