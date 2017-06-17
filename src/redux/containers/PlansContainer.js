import { connect } from 'react-redux'
import Plans from '../../scenes/Plans/Plans'


const mapStateToProps = (state, ownProps) => {
  return {
    plans: state.plans
  }
}

const PlansContainer = connect(
  mapStateToProps,
  null
)(Plans)

export default PlansContainer
