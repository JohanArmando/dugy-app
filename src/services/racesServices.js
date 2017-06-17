import axios from './axios'

export function getRaces () {
  return new Promise((resolve, reject) => {
    axios.get('/races')
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}
