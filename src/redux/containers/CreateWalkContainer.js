import { connect } from 'react-redux'
import CreateWalk from '../../scenes/CreateWalk/CreateWalk'


const mapStateToProps = (state, ownProps) => {
  return {
    pets: state.pets,
    user: state.auth
  }
}

const CreateWalkContainer = connect(
  mapStateToProps,
  null
)(CreateWalk)

export default CreateWalkContainer
