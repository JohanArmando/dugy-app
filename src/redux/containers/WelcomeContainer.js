import { connect } from 'react-redux'
import { login } from '../actions'
import Welcome from '../../scenes/Welcome/Welcome'

const mapDispatchToProps = (dispatch) => ({
  doLogin: (user) => {
    console.log(login(user));
    dispatch(login(user));
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth
  }
}

const WelcomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)

export default WelcomeContainer
