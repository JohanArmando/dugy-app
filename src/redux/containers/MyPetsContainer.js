import { connect } from 'react-redux'
import MyPets from '../../scenes/MyPets/MyPets'


const mapStateToProps = (state, ownProps) => {
  return {
    pets: state.pets
  }
}

const MyPetsContainer = connect(
  mapStateToProps,
  null
)(MyPets)

export default MyPetsContainer
