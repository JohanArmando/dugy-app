import { connect } from 'react-redux'
import { login } from '../actions'
import Login from '../../scenes/Login/Login'

const mapDispatchToProps = (dispatch) => ({
  doLogin: (user) => {
    dispatch(login(user));
  }
})

const LoginContainer = connect(
  null,
  mapDispatchToProps
)(Login)

export default LoginContainer
