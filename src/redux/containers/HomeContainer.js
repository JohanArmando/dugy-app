import { connect } from 'react-redux'
import { populatePets, populateSizes, populateRaces, populatePlans, populateServices } from '../actions'
import Home from '../../scenes/Home/Home'

const mapDispatchToProps = (dispatch) => ({
  populatePets: (pets) => {
    dispatch(populatePets(pets));
  },
  populateSizes: (sizes) => {
    dispatch(populateSizes(sizes));
  },
  populateRaces: (races) => {
    dispatch(populateRaces(races));
  },
  populatePlans: (plans) => {
    dispatch(populatePlans(plans));
  },
  populateServices: (services) => {
    dispatch(populateServices(services));
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
    services: state.services,
    pets: state.pets
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
