import { connect } from 'react-redux'
import { login } from '../actions'
import Register from '../../scenes/Register/Register'

const mapDispatchToProps = (dispatch) => ({
  doLogin: (user) => {
    dispatch(login(user));
  }
})

const RegisterContainer = connect(
  null,
  mapDispatchToProps
)(Register)

export default RegisterContainer
