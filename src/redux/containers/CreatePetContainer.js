import { connect } from 'react-redux'
import { populatePets } from '../actions'
import CreatePet from '../../scenes/CreatePet/CreatePet'

const mapDispatchToProps = (dispatch) => ({
  populatePets: (pets) => {
    dispatch(populatePets(pets));
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
    pets: state.pets,
    sizes: state.sizes,
    races: state.races
  }
}

const CreatePetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePet)

export default CreatePetContainer
