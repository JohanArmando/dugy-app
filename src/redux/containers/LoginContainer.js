import { connect } from 'react-redux'
import { login } from '../actions'
import Login from '../../scenes/Login/Login'

const mapDispatchToProps = (dispatch) => ({
  doLogin: (user) => {
    console.log(login(user));
    dispatch(login(user));
  }
})

const LoginContainer = connect(
  null,
  mapDispatchToProps
)(Login)

export default LoginContainer
