import axios from './axios'

export function login (user) {
  return new Promise((resolve, reject) => {
    axios.post('/auth/login', { email: user.email, password: user.password })
    .then(response => {
      axios.defaults.headers.authorization = 'Bearer ' + response.data.token
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function register (user) {
  return new Promise((resolve, reject) => {
    axios.post('/users', user)
    .then(response => {
      axios.defaults.headers.authorization = 'Bearer ' + response.data.token
      resolve(response.data)
    })
    .catch(error => {
      console.log(error.response)
      reject(error)
    })
  })
}

export function session (data) {
  axios.defaults.headers.authorization = 'Bearer ' + data
  return new Promise((resolve, reject) => {
    axios.get('/auth/user')
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('axios', error)
      reject(error)
    })
  })
}

export function updateProfile (id, data) {
  return new Promise((resolve, reject) => {
    axios.put('/users/' + id, data)
    .then(response => {
      console.log(response)
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}
