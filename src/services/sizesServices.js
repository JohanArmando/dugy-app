import axios from './axios'

export function getSizes () {
  return new Promise((resolve, reject) => {
    axios.get('/sizes')
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}
