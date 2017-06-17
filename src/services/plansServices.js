import axios from './axios'

export function getPlans () {
  return new Promise((resolve, reject) => {
    axios.get('/plans')
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}
