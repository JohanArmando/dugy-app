import { connect } from 'react-redux'
import CreateWalk from '../../scenes/CreateWalk/CreateWalk2'


const mapStateToProps = (state, ownProps) => {
  return {
    pets: ownProps.pets,
    user: state.auth,
    allPets: state.pets
  }
}

const CreateWalkContainer = connect(
  mapStateToProps,
  null
)(CreateWalk)

export default CreateWalkContainer
